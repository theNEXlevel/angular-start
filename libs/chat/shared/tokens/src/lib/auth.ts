import { InjectionToken } from '@angular/core';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { environment } from './environments';

export const AUTH = new InjectionToken('Firebase auth', {
  providedIn: 'root',
  factory: () => {
    const auth = getAuth();
    if (environment.useEmulators) {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    }
    return auth;
  },
});
