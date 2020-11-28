import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/animations';

@Component({
  selector: 'wp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ routerTransition ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
