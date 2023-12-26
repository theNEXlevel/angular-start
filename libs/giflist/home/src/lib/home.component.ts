import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditService } from 'giflist-shared-data-access';
import { GifListComponent } from './ui';

@Component({
  selector: 'as-home',
  standalone: true,
  imports: [CommonModule, GifListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  redditService = inject(RedditService);
}
