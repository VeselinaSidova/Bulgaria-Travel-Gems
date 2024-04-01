import { Province } from './province.enum';
import { Region } from './region.enum';

export interface Location {
  _id?: string;
  _ownerId: string;
  name: string;
  imageUrl: string;
  province: Province;
  region: Region;
  distanceFromCapital: number;
  description: string;
  articles: string[];
  wishlist: string[];
}
