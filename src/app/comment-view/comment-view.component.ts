import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TimeAgoPipe, FromUnixPipe } from 'angular2-moment';

import { HnService } from '../hn.service';
import { PrettyUrlPipe } from '../pretty-url.pipe'
import { Item } from '../models';
import { CommentItemComponent } from '../comment-item';

@Component({
  moduleId: module.id,
  selector: 'app-comment-view',
  templateUrl: 'comment-view.component.html',
  styleUrls: ['comment-view.component.css'],
  pipes: [TimeAgoPipe, FromUnixPipe, PrettyUrlPipe],
  directives: [CommentItemComponent]
})
export class CommentViewComponent implements OnInit, OnDestroy {
  item: Item;
  errorMessage: any;
  private sub: any;
  loc: Location;

  constructor(
    loc: Location,
    private route: ActivatedRoute,
    private  hn: HnService) {
    this.loc = loc;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = parseInt(params['id']);
      this.hn.fetchItem(id).subscribe(
        item => this.item = item,
        error => this.errorMessage = <any>error,
        () => {
          /*this.hn.fetchKids(this.item.kids).subscribe(
           comment => {
           comments.push(comment);

           if (comment.parent == id) {
           this.comments.push(comment)
           } else {
           var count = comments.length;
           while(count > 0) {
           var c = comments[--count];
           if()

           }

           }
           },
           error => this.errorMessage = <any>error
           )}*/
        }
      )
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
