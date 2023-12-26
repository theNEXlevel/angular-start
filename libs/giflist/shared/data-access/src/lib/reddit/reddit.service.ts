import { Injectable } from '@angular/core';
import { RedditState } from '@interfaces/giflist';
import { signalSlice } from 'ngxtension/signal-slice';
import { map, merge, of } from 'rxjs';

const INITIAL_STATE: RedditState = {
  gifs: [],
};

@Injectable({
  providedIn: 'root',
})
export class RedditService {
  // sources
  private gifsLoaded$ = of([
    {
      src: '',
      author: '',
      name: '',
      permalink: '',
      title: 'test gif',
      thumbnail: '',
      comments: 0,
    },
  ]);

  private sources$ = merge(this.gifsLoaded$.pipe(map((gifs) => ({ gifs }))));

  state = signalSlice({
    initialState: INITIAL_STATE,
    sources: [this.sources$],
  });
}
