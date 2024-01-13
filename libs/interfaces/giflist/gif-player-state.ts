import { GifPlayerStatus } from './gif-player-status';

export interface GifPlayerState {
  playing: boolean;
  status: GifPlayerStatus;
}
