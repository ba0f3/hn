import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TimeAgoPipe, FromUnixPipe } from 'angular2-moment';

import { HnService } from '../hn.service';
import { PrettyUrlPipe } from '../pretty-url.pipe'
import { Item } from '../models';
import {LocalStorageService} from "../local-storage.service";

@Component({
  moduleId: module.id,
  selector: 'app-item-view',
  templateUrl: 'item-view.component.html',
  pipes: [TimeAgoPipe, FromUnixPipe, PrettyUrlPipe]
})
export class ItemViewComponent implements OnInit, OnDestroy {
  item: Item;
  content: any;
  errorMessage: any;
  private sub: any;

  loc: Location;

  constructor(
    loc: Location,
    private route: ActivatedRoute,
    private hn: HnService,
    private ls: LocalStorageService) {
    this.loc = loc;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // clear content
      this.content = null;
      let id = parseInt(params['id']);
      this.hn.fetchItem(id).subscribe(
        item => {
          this.item = item;
          this.hn.fetchContent(item.url, id).subscribe(content => this.content = content);
        },
        error => this.errorMessage = <any>error,
        () => {
          let visited: number[] = this.ls.get("visited", []);
          visited.push(id);
          this.ls.set("visited", visited);
        }
      )
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
