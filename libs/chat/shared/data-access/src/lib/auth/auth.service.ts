import { Injectable, inject } from '@angular/core';
import { AUTH } from '@as/chat/shared/tokens';
import { Credentials } from '@interfaces/chat';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { signalSlice } from 'ngxtension/signal-slice';
import { authState } from 'rxfire/auth';
import { defer, from, map, merge } from 'rxjs';

type AuthUser = User | null | undefined;

interface AuthState {
  user: AuthUser;
}

const INITIAL_STATE: AuthState = {
  user: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(AUTH);

  // sources
  private user$ = authState(this.auth).pipe(map((user) => ({ user })));

  private sources$ = merge(this.user$);

  state = signalSlice({
    initialState: INITIAL_STATE,
    sources: [this.sources$],
  });

  createAccount(credentials: Credentials) {
    return from(defer(() => createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)));
  }

  login(credentials: Credentials) {
    return from(defer(() => signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)));
  }

  logout() {
    signOut(this.auth);
  }
}
