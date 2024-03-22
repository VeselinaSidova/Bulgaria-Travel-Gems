import { User } from './user';
import { Location } from './location';

export interface Article {
  id?: string;
  title: string;
  location: Location;
  content: string;
  createdBy: User;
}
