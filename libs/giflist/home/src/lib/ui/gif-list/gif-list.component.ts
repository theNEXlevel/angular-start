import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gif } from '@interfaces/giflist';
import { GifPlayerComponent } from '../gif-player';

@Component({
  selector: 'as-gif-list',
  standalone: true,
  imports: [CommonModule, GifPlayerComponent],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  @Input({ required: true }) data!: Gif[];
}
