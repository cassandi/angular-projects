import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/animations';
import { WordpressService } from '../core/wordpress.service';

@Component({
  selector: 'wp-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [ routerTransition ]
})
export class PostComponent implements OnInit {
  post;

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService
  ) {
    this.wordpressService.post$.subscribe(data => {
      this.post = data;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.wordpressService.getPost(params.id);
    })
  }

}
