import { Injectable, computed, inject } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { Message } from '@interfaces/chat';
import { FIRESTORE } from '@as/chat/shared/tokens';
import { signalSlice } from 'ngxtension/signal-slice';

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
  private firestore = inject(FIRESTORE);

  // sources
  private messages$ = this.getMessages().pipe(map((messages) => ({ messages })));

  sources$ = merge(this.messages$);

  // state

  state = signalSlice({
    initialState: INITIAL_STATE,
    sources: [this.sources$],
  });

  // selectors
  messages = computed(() => this.state().messages);
  error = computed(() => this.state().error);

  private getMessages() {
    const messagesCollection = query(collection(this.firestore, 'messages'), orderBy('created', 'desc'), limit(50));

    return collectionData(messagesCollection, { idField: 'id' }).pipe(map((messages) => [...messages].reverse())) as Observable<Message[]>;
  }
}
