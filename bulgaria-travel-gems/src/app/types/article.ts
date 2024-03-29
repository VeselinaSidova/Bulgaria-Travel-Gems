export interface Article {
  _id?: string;
  title: string;
  location: string;
  imageUrl: string;
  content: string;
  _ownerId: string;
  _createdOn: Date;
}
