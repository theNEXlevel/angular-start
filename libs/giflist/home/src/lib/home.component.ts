import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditService } from 'giflist-shared-data-access';
import { GifListComponent, SearchBarComponent } from './ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'as-home',
  standalone: true,
  imports: [CommonModule, GifListComponent, InfiniteScrollModule, MatProgressSpinnerModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  console = console;
  redditService = inject(RedditService);
}
