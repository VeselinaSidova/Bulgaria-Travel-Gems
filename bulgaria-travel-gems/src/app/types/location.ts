import { Province } from './province.enum';
import { Region } from './region.enum';

export interface Location {
  id?: string;
  _ownerId: string;
  name: string;
  province: Province;
  region: Region;
  description: string;
  articleId: string;
}
