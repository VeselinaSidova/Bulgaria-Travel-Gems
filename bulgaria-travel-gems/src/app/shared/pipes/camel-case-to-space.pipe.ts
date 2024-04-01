import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSpace',
})
export class CamelCaseToSpacePipe implements PipeTransform {
  transform(text: string): string {
    return text ? text.replace(/([A-Z])/g, ' $1').trim() : text;
  }
}
