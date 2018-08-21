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
  selector: 'app-observables',
  templateUrl: './observables.component.html'
})
export class ObservablesComponent {
  simulateHttp(val: any, _delay: number) {
    return of(val).pipe(delay(_delay));
  }

  simulateFirebase(val: any, _delay: number) {
    return interval(_delay).pipe(map(index => val + ' ' + index));
  }

  onSimulateButtonPressed() {
    console.log('simulating HTTP requests');

    const http1$ = this.simulateHttp('1', 1000);

    const http2$ = this.simulateHttp('2', 1000);

    // combine two HTTP requests, and see the result.
    const saveUser$ = this.simulateHttp(' user saved ', 1000);

    const httpResult$ = saveUser$.pipe(
      switchMap(sourceValue => {
        console.log('sourceValue', sourceValue);
        return this.simulateHttp(' data reloaded ', 2000);
      })
    );

    httpResult$.subscribe(console.log, console.error, () => console.log('completed httpResult$'));
  }

  onSimulateFirebaseButtonPressed() {
    const firebase1$ = this.simulateFirebase('FB-1 ', 5000);
    const firebase2$ = this.simulateFirebase('FB-2 ', 1000);

    const firebaseResult$ = firebase1$.pipe(
      switchMap(sourceValue => {
        console.log('create new inner observable ' + sourceValue);
        // The result observable has switched from emitting the values of the first inner observable,
        // to emitting the values of the newly created inner observable
        return this.simulateFirebase('inner observable ', 1000);
      })
    );

    firebaseResult$.subscribe(console.log, console.error, () =>
      console.log('completed firebaseResult$')
    );
  }
}
