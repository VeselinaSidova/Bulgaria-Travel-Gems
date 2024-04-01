import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'elapsedTime',
})
export class ElapsedTimePipe implements PipeTransform {
  transform(timestamp: number, ...args: unknown[]): unknown {
    const date = moment(timestamp);

    return moment(date).fromNow();
  }
}
