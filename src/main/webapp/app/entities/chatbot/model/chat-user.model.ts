import { Moment } from 'moment';
import { ChatUserStatus } from '../enumeration/chat-user-status.model';

export interface IChatUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  langKey?: string;
  createdDate?: Moment;
  status?: ChatUserStatus;
}

export class ChatUser implements IChatUser {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public langKey?: string,
    public createdDate?: Moment,
    public status?: ChatUserStatus
  ) {}
}
