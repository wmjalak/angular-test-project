import { OnInit, Component } from '@angular/core';

import { fromEvent } from 'rxjs';
import {
  map,
  filter,
  tap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {

  ngOnInit() {
    const searchBox = document.getElementById('search-box');

    const typeahead = fromEvent(searchBox, 'input').pipe(
      map((e: KeyboardEvent) => e.target['value']),
      filter(text => text.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(text => {
        console.log(text);
      })
    );

    typeahead.subscribe(data => {
      console.log('Handle the data from the API:', data);
    });
  }
}
