import { Component } from '@angular/core';
import { routerTransition } from 'src/animations';

@Component({
  selector: 'wp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})
export class AppComponent {
  title = 'wordpress';

  getOutlet(o) {
    return o.activatedRouteData.routeState;
  }
}
