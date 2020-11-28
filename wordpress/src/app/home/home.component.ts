import { Component, OnInit } from '@angular/core';
import { postsAnimation, routerTransition } from 'src/animations';
import { WordpressService } from '../core/wordpress.service';

@Component({
  selector: 'wp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ postsAnimation, routerTransition ]
})
export class HomeComponent implements OnInit {
  posts$ = this.wordpressService.getPosts();

  constructor(private wordpressService: WordpressService) { }

  ngOnInit(): void {
  }

}
