import { Gif } from './gif';

export interface RedditState {
  gifs: Gif[];
  error: string | null;
  loading: boolean;
  lastKnownGif: string | null;
}
