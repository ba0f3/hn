import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyUrl'
})
export class PrettyUrlPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value)
      return null;
    value = value.substring(value.indexOf('//') + 2);
    if(value.startsWith("www.")) {
      value = value.substring(value.indexOf('.') + 1);
    }
    return value;
  }

}
