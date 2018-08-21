import { OnInit, Component } from '@angular/core';

import { fromEvent, interval, of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  delay,
  map,
  filter,
  tap,
  mergeMap,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  /*
  simpleObservable = new Observable((observer) => {
    observer.next('simpleObservable: bla bla blaa');
    observer.complete();
  });
  */

  simpleObservable: Observable<string>;

  testMiscThings() {
    const statistics = [
      {
        Person: 1,
        Entitlement: 2
      }
    ];

    const stat1 = statistics[0];

    Object.entries(stat1).forEach(
      ([key, value]) => console.log(key, value)
    );

    Object.keys(stat1).forEach(key =>
      console.log(`key=${key} value=${stat1[key]}`)
    );

  }

}
