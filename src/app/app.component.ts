import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
