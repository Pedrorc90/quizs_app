import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak',
  standalone: true
})
export class LineBreakPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replaceAll("\n", "<br />");
  }

}
