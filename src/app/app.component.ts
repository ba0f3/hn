import { Component } from '@angular/core';
import { TimeAgoPipe, FromUnixPipe } from 'angular2-moment';

import { HnService } from './hn.service';
import { Item } from './models';

@Component({
  moduleId: module.id,
  pipes: [TimeAgoPipe, FromUnixPipe],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'app works!';

  showLoading = false;

  itemIds: number[] = [];
  items: Item[] = [];
  errorMessage: any;

  constructor(private hn: HnService) {
    hn.getTopStories().subscribe(
      items => this.itemIds = items,
      error =>  this.errorMessage = <any>error,
      () =>  {
        if(this.itemIds.length > 0)
          this.showLoading = true;

        var count = 0;
        while(count < 10) {
          count++;

          hn.fetchItem(this.itemIds[count]).subscribe(
            (item: Item) => {
              this.items.push(item);
              console.log(item)
            },
            error => this.errorMessage = <any>error
          )
        }
      }
    );
  }
}
