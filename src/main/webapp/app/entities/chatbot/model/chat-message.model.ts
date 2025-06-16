import { Moment } from 'moment';
import { ChatMessageStatus } from '../enumeration/chat-message-status.model';

export interface IChatMessage {
  id?: string;
  content?: string;
  sender?: string;
  recipient?: string;
  language?: string;
  name?: string;
  ipAddress?: string;
  sessionId?: string;
  status?: ChatMessageStatus;
  createdDate?: Moment;
}

export class ChatMessage implements IChatMessage {
  constructor(
    public id?: string,
    public content?: string,
    public sender?: string,
    public recipient?: string,
    public language?: string,
    public name?: string,
    public ipAddress?: string,
    public sessionId?: string,
    public status?: ChatMessageStatus,
    public createdDate?: Moment
  ) {}
}
