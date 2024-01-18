import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Gif, RedditPost, RedditResponse, RedditState } from '@interfaces/giflist';
import { signalSlice } from 'ngxtension/signal-slice';
import { EMPTY, Subject, catchError, concatMap, debounceTime, distinctUntilChanged, expand, map, merge, startWith, switchMap } from 'rxjs';

const INITIAL_STATE: RedditState = {
  gifs: [],
  error: null,
  loading: true,
  lastKnownGif: null,
};

@Injectable({
  providedIn: 'root',
})
export class RedditService {
  private http = inject(HttpClient);

  subredditFormControl = new FormControl();

  // sources
  private error$ = new Subject<string | null>();
  private pagination$ = new Subject<string | null>();

  private subredditChanged$ = this.subredditFormControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith('gifs'),
    map((subreddit) => (subreddit.length ? subreddit : 'gifs')),
  );

  private gifsLoaded$ = this.subredditChanged$.pipe(
    switchMap((subreddit) =>
      this.pagination$.pipe(
        startWith(null),
        concatMap((lastKnownGif) => this.fetchFromReddit(subreddit, lastKnownGif, 20)),
        expand((response, index) => {
          const { gifs, gifsRequired, lastKnownGif } = response;
          const remainingGifsToFetch = gifsRequired - gifs.length;
          const maxAttempts = 15;

          const shouldKeepTrying = remainingGifsToFetch > 0 && index < maxAttempts && lastKnownGif !== null;

          return shouldKeepTrying ? this.fetchFromReddit(subreddit, lastKnownGif, remainingGifsToFetch) : EMPTY;
        }),
      ),
    ),
  );

  private sources$ = merge(
    this.subredditChanged$.pipe(
      map(() => ({
        loading: true,
        gifs: [],
        lastKnownGif: null,
      })),
    ),
    this.error$.pipe(map((error) => ({ error }))),
  );

  state = signalSlice({
    initialState: INITIAL_STATE,
    sources: [
      this.sources$,
      (state) =>
        this.gifsLoaded$.pipe(
          map((response) => ({
            gifs: [...state().gifs, ...response.gifs],
            loading: false,
            lastKnownGif: response.lastKnownGif,
          })),
        ),
    ],
    actionSources: {
      pagination: this.pagination$,
    },
  });

  private fetchFromReddit(subreddit: string, after: string | null, gifsRequired: number) {
    return this.http.get<RedditResponse>(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=100` + (after ? `&after=${after}` : '')).pipe(
      catchError((err) => {
        this.handleError(err);
        return EMPTY;
      }),
      map((response) => {
        const posts = response.data.children;
        const lastKnownGif = posts.length ? posts[posts.length - 1].data.name : null;

        return {
          gifs: this.convertRedditPostsToGifs(posts),
          gifsRequired,
          lastKnownGif,
        };
      }),
    );
  }

  private convertRedditPostsToGifs(posts: RedditPost[]) {
    const defaultThumbnails = ['default', 'none', 'nsfw'];

    return posts
      .map((post) => {
        const thumbnail = post.data.thumbnail;
        const modifiedThumbnail = defaultThumbnails.includes(thumbnail) ? `/assets/${thumbnail}.png` : thumbnail;

        return {
          src: this.getBestSrcForGif(post),
          author: post.data.author,
          name: post.data.name,
          permalink: post.data.permalink,
          title: post.data.title,
          thumbnail: modifiedThumbnail,
          comments: post.data.num_comments,
        };
      })
      .filter((post): post is Gif => post.src !== null);
  }

  private getBestSrcForGif(post: RedditPost) {
    // If the source is in .mp4 format, leave unchanged
    if (post.data.url.indexOf('.mp4') > -1) {
      return post.data.url;
    }

    // If the source is in .gifv or .webm formats, convert to .mp4 and return
    if (post.data.url.indexOf('.gifv') > -1) {
      return post.data.url.replace('.gifv', '.mp4');
    }

    if (post.data.url.indexOf('.webm') > -1) {
      return post.data.url.replace('.webm', '.mp4');
    }

    // If the URL is not .gifv or .webm, check if media or secure media is available
    if (post.data.secure_media?.reddit_video) {
      return post.data.secure_media.reddit_video.fallback_url;
    }

    if (post.data.media?.reddit_video) {
      return post.data.media.reddit_video.fallback_url;
    }

    // If media objects are not available, check if a preview is available
    if (post.data.preview?.reddit_video_preview) {
      return post.data.preview.reddit_video_preview.fallback_url;
    }

    // No useable formats available
    return null;
  }

  private handleError(err: HttpErrorResponse) {
    if (err.status === 404 && err.url) {
      this.error$.next(`Failed to load gifs for /r/${err.url.split('/')[4]}`);
      return;
    }

    this.error$.next(err.statusText);
  }
}
