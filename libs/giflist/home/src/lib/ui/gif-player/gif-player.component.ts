import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GifPlayerData, GifPlayerState } from '@interfaces/giflist';
import { EMPTY, Observable, combineLatest, filter, fromEvent, map, switchMap } from 'rxjs';
import { signalSlice } from 'ngxtension/signal-slice';

const INITIAL_STATE: GifPlayerState = {
  playing: false,
  status: 'initial',
};

@Component({
  selector: 'as-gif-player',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './gif-player.component.html',
  styleUrl: './gif-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifPlayerComponent {
  @Input({ required: true }) data!: GifPlayerData;

  // Fake new signals API
  videoElement = signal<HTMLVideoElement | undefined>(undefined);
  @ViewChild('gifPlayer') set video(element: ElementRef<HTMLVideoElement>) {
    this.videoElement.set(element.nativeElement);
  }

  // sources
  videoElement$ = toObservable(this.videoElement).pipe(filter((element): element is HTMLVideoElement => !!element));

  state = signalSlice({
    initialState: INITIAL_STATE,
    actionSources: {
      play: (state, actions$: Observable<void>) =>
        actions$.pipe(
          map(() => ({
            ...state(),
            playing: !state().playing,
          })),
        ),
      videoLoadStart: (state, actions$: Observable<Event>) =>
        actions$.pipe(
          map(() => ({
            ...state(),
            status: 'loading',
          })),
        ),
      videoLoadComplete: (state, actions$: Observable<Event>) =>
        actions$.pipe(
          map(() => ({
            ...state(),
            status: 'loaded',
          })),
        ),
    },
  });

  videoLoadStart$ = combineLatest([this.videoElement$, toObservable(this.state.playing)]).pipe(
    switchMap(([element, playing]) => (playing ? fromEvent(element, 'loadstart') : EMPTY)),
  );

  videoLoadComplete$ = this.videoElement$.pipe(switchMap((element) => fromEvent(element, 'loadeddata')));

  constructor() {
    this.state.videoLoadStart(this.videoLoadStart$);
    this.state.videoLoadComplete(this.videoLoadComplete$);
    // effects
    effect(() => {
      const video = this.videoElement();
      const playing = this.state().playing;
      const status = this.state().status;

      if (!video) {
        return;
      }

      if (playing && status === 'initial') {
        video.load();
      }

      if (status === 'loaded') {
        playing ? video.play() : video.pause();
      }
    });
  }
}
