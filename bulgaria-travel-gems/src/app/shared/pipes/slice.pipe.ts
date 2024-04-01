import { Pipe, PipeTransform } from '@angular/core';
import { max } from 'rxjs';

@Pipe({
  name: 'slice',
})
export class SlicePipe implements PipeTransform {
  transform(value: string, maxCount = 10): string {
    return `${value.substring(0, maxCount)}${
      value.length > maxCount ? '...' : ''
    }`;
  }
}
