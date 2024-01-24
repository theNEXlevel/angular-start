import { Injectable, inject } from '@angular/core';
import { AuthService } from '@as/chat/shared/data-access';
import { Credentials, RegisterState } from '@interfaces/chat';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';

const INITIAL_STATE: RegisterState = {
  status: 'pending',
  error: null,
};

@Injectable()
export class RegisterService {
  private authService = inject(AuthService);

  state = signalSlice({
    initialState: INITIAL_STATE,
    actionSources: {
      createUser: (_, $: Observable<Credentials>) =>
        $.pipe(
          switchMap((credentials) =>
            this.authService.createAccount(credentials).pipe(
              map(() => ({ status: 'success' as const })),
              catchError((error) => of({ error })),
              startWith({ status: 'creating' as const }),
            ),
          ),
        ),
    },
  });
}
