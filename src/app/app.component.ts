import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TimeAgoPipe, FromUnixPipe } from 'angular2-moment';
import { Observable } from 'rxjs/Observable';

import { HnService } from './hn.service';
import { PrettyUrlPipe } from './pretty-url.pipe'
import { Page, Item } from './models';

@Component({
  moduleId: module.id,
  pipes: [TimeAgoPipe, FromUnixPipe, PrettyUrlPipe],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  showLoading = true;
  showLoadMore = true;
  showSubMenu = '';

  itemIds: number[] = [];
  items: Item[] = [];
  errorMessage: any;

  currentPage = Page.FRONT_PAGE;
  lastIndex: number = 0;

  constructor(private hn: HnService) {
    this.loadData();
  }

  switchPage(page: string) {
    if(page == 'fp')
      this.currentPage = Page.FRONT_PAGE;
    else if (page == 'ask')
      this.currentPage = Page.ASK_HN;
    else if (page == 'show')
      this.currentPage = Page.SHOW_HN;
    else if (page == 'job')
      this.currentPage = Page.JOB;
    else if (page == 'new')
      this.currentPage = Page.NEWEST;
    else if (page == 'best')
      this.currentPage = Page.BEST;
    this.showSubMenu = '';
    this.reload(null);
  }

  loadData() {
    this.lastIndex = 0;
    var ob: Observable<number[]>;
    switch (this.currentPage) {
      case Page.ASK_HN:
        ob = this.hn.getAskStories();
        break;
      case Page.SHOW_HN:
        ob = this.hn.getShowStories();
        break;
      case Page.JOB:
        ob = this.hn.getJobStories();
        break;
      case Page.NEWEST:
        ob = this.hn.getNewStories();
        break;
      case Page.BEST:
        ob = this.hn.getBestStories();
        break;
      case Page.FRONT_PAGE:
      default:
        ob = this.hn.getTopStories();
        break;
    }

    ob.subscribe(
      items => this.itemIds = items,
      error =>  this.errorMessage = <any>error,
      () =>  {
        if(this.itemIds.length > 0)
          this.showLoading = false;
        this.loadNext(null);
      }
    );
  }

  loadNext(event) {
    if(event)
      event.preventDefault()
    var count = 0;
    while(count < 10) {
      count++;

      this.hn.fetchItem(this.itemIds[this.lastIndex++]).subscribe(
        item => this.items.push(item),
        error => this.errorMessage = <any>error
      )
    }
    if (this.lastIndex >= this.itemIds.length) {
      this.showLoadMore = false;
    }
  }

  reload(event) {
    if(event)
      event.preventDefault()
    this.itemIds = [];
    this.items = [];
    this.lastIndex = 0;
    this.loadData();
  }

  toggleSubMenu(event) {
    event.preventDefault();
    if(this.showSubMenu == '') {
      this.showSubMenu = 'show-submenu';
    } else {
      this.showSubMenu = '';
    }
  }
}
