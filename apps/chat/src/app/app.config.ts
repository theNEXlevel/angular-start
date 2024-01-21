import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_CONFIG, environment } from '@as/chat/shared/tokens';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations(), { provide: APP_CONFIG, useValue: environment }],
};
