export interface Article {
  _id?: string;
  title: string;
  imageUrl: string;
  locationId: string;
  content: string;
  _ownerId?: string;
  _createdOn?: number;
  liked?: string[];
}
