import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'runtimePipe' })
export class CleanRuntimePipe implements PipeTransform {
    transform(word: string): string {

        return word ? word.replace(/\D/g, '') + ' minutes' : word;
        //     if (word == "") {
        //         return "please enter runtime"
        //     }
        //     else {
        //         word = word.replace(/\D/g, '');
        //     }

        //     return word + " minutes";
        // }
    }
}