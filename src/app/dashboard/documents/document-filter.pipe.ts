import { Pipe, PipeTransform } from '@angular/core';
import {Document} from 'src/app/shared/models/document';

@Pipe({
  name: 'documentFilter'
})
export class DocumentFilterPipe implements PipeTransform {

  transform(value: Document[], filterText?:string): Document[] {

    filterText = filterText?filterText.toLocaleLowerCase():null
    
    return filterText?value.filter((p:Document)=>p.name.toLocaleLowerCase()
    
    .indexOf(filterText)!==-1):value;

  }

}
