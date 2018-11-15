import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'onlyEng' })
export class OnlyEngPipe implements PipeTransform {
  transform(word: string) :string {
    // return word = word.replace(/[^a-zA-Z ]/g, "");
    
   word = word.replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ");
   
    return word;
  }
}