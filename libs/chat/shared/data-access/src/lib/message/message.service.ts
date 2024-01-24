import { Injectable, inject } from '@angular/core';
import { Observable, defer, merge, of, catchError, exhaustMap, ignoreElements, map, EMPTY } from 'rxjs';
import { collection, query, orderBy, limit, addDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Message } from '@interfaces/chat';
import { FIRESTORE } from '@as/chat/shared/tokens';
import { signalSlice } from 'ngxtension/signal-slice';
import { AuthService } from '../auth';

interface MessageState {
  messages: Message[];
  error: string | null;
}

const INITIAL_STATE: MessageState = {
  messages: [],
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private authService = inject(AuthService);
  private firestore = inject(FIRESTORE);

  // sources
  private messages$ = this.getMessages().pipe(map((messages) => ({ messages })));

  private sources$ = merge(this.messages$);

  // state

  state = signalSlice({
    initialState: INITIAL_STATE,
    sources: [this.sources$],
    actionSources: {
      add: (_, actions$: Observable<Message['content']>) =>
        actions$.pipe(
          exhaustMap((message) => (this.authService.state.user()?.email ? this.addMessage(message) : EMPTY)),
          ignoreElements(),
          catchError((error) => of({ error })),
        ),
    },
  });

  private addMessage(message: string) {
    const newMessage: Message = {
      author: this.authService.state.user()!.email!,
      content: message,
      created: Date.now().toString(),
    };

    const messagesCollection = collection(this.firestore, 'messages');
    return defer(() => addDoc(messagesCollection, newMessage));
  }

  private getMessages() {
    const messagesCollection = query(collection(this.firestore, 'messages'), orderBy('created', 'desc'), limit(50));

    return collectionData(messagesCollection, { idField: 'id' }).pipe(map((messages) => [...messages].reverse())) as Observable<Message[]>;
  }
}
