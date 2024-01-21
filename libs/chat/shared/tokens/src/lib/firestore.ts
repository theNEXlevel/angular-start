import { InjectionToken } from '@angular/core';
import { environment } from './environments';

import { initializeApp } from 'firebase/app';
import { Firestore, initializeFirestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const app = initializeApp(environment.firebase);

export const FIRESTORE = new InjectionToken('Firebase firestore', {
  providedIn: 'root',
  factory: () => {
    let firestore: Firestore;
    if (environment.useEmulators) {
      firestore = initializeFirestore(app, {});
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    } else {
      firestore = getFirestore();
    }
    return firestore;
  },
});
