import { Pipe, PipeTransform } from '@angular/core';

import {ContactsInterface} from "../types/contacts.interface";

@Pipe({
  name: "search",
})

export class SearchPipe implements PipeTransform {
  transform(article: ContactsInterface[], saerchStrings: string[]): ContactsInterface[] {
    if(saerchStrings){
      return article.filter(articleName => {
        return saerchStrings?.some(substring=>articleName.firstName.includes(substring))
          || saerchStrings?.some(substring=>articleName.lastName.includes(substring))
          ;
      });
    }
    else { return article }
  };
}
