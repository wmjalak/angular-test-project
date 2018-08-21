import { OnInit, Component } from '@angular/core';

import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, concatMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-multiple-requests',
  templateUrl: './multiple-requests.component.html'
})
export class MultipleRequestsComponent {
  fakeTheConnection = false;

  constructor(private http: HttpClient) {}

  simulateHttp(val: any, _delay: number) {
    if (this.fakeTheConnection) {
      return of(val).pipe(delay(_delay));
    }
    return this.http.get(`https://hacker-news.firebaseio.com/v0/item/${val}.json`);
  }

  getItems(value: number) {
    return this.simulateHttp(value, 1000);
  }

  getSecondItems(value: number) {
    return this.simulateHttp(value, 1000);
  }

  getThirdItems(value: number) {
    return this.simulateHttp(value, 1000);
  }

  onMultipleRequestsPressed() {
    // this.concatMapExample();
    this.switchMapExample();
  }

  concatMapExample() {
    console.log('concapMap example');
    let randomInt = Math.floor(Math.random() * 100);
    const multipleRequest = this.getItems(randomInt).pipe(
      concatMap(result => {
        console.log('result', result);
        randomInt++;
        return this.getSecondItems(randomInt);
      }),
      concatMap(result => {
        console.log('result', result);
        randomInt++;
        return this.getThirdItems(randomInt);
      })
    );

    multipleRequest.subscribe(
      result => {
        console.log('result is finally here', result);
      },
      () => {}
    );
  }

  switchMapExample() {
    console.log('switchMap example');
    let randomInt = Math.floor(Math.random() * 100);
    const multipleRequest = this.getItems(randomInt).pipe(
      switchMap(result => {
        console.log('result', result);
        randomInt++;
        return this.getSecondItems(randomInt);
      }),
      switchMap(result => {
        console.log('result', result);
        randomInt++;
        return this.getThirdItems(randomInt);
      })
    );

    multipleRequest.subscribe(
      result => {
        console.log('result is finally here', result);
      },
      () => {}
    );
  }
}
