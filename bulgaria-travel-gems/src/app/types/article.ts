export interface Article {
  _id?: string;
  title: string;
  locationId: string;
  imageUrl: string;
  content: string;
  _ownerId: string;
  _createdOn: Date;
  liked: string[];
}
