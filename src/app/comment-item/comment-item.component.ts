import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../models";

import { TimeAgoPipe, FromUnixPipe } from 'angular2-moment';
import {HnService} from "../hn.service";
@Component({
  moduleId: module.id,
  selector: '[comment-item]',
  pipes: [TimeAgoPipe, FromUnixPipe],
  templateUrl: 'comment-item.component.html',
  directives: [CommentItemComponent]
})
export class CommentItemComponent implements OnInit{
  @Input() id: number;
  comment: Item;
  constructor(private hn: HnService) {
  }

  ngOnInit() {
    this.hn.fetchItem(this.id).subscribe(
      item => this.comment = item
    )
  }

}
