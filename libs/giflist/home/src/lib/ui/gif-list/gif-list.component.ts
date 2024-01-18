import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gif } from '@interfaces/giflist';
import { GifPlayerComponent } from '../gif-player';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { WINDOW } from '@as/giflist/shared/utils';

@Component({
  selector: 'as-gif-list',
  standalone: true,
  imports: [CommonModule, GifPlayerComponent, MatIconModule, MatToolbarModule],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  @Input({ required: true }) data!: Gif[];

  window = inject(WINDOW);
}
