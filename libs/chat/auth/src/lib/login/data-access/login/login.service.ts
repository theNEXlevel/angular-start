import { Injectable, inject } from '@angular/core';
import { AuthService } from '@as/chat/shared/data-access';
import { Credentials, LoginState } from '@interfaces/chat';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';

const INITIAL_STATE: LoginState = {
  status: 'pending',
  error: null,
};

@Injectable()
export class LoginService {
  private authService = inject(AuthService);

  state = signalSlice({
    initialState: INITIAL_STATE,
    actionSources: {
      login: (_, $: Observable<Credentials>) =>
        $.pipe(
          switchMap((credentials) =>
            this.authService.login(credentials).pipe(
              map(() => ({ status: 'success' as const })),
              catchError((error) => of({ error, status: 'error' as const })),
              startWith({ status: 'authenticating' as const }),
            ),
          ),
        ),
    },
  });
}
