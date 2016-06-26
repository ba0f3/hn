import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import './rxjs-operators';
import { Item } from './models';

const prefix =  "https://hacker-news.firebaseio.com/v0/";

@Injectable()
export class HnService {
  constructor (private http: Http) {}

  private topStories = prefix + 'topstories.json';

  getTopStories (): Observable<number[]> {
    return this.http.get(this.topStories)
      .map(this.fetchItems)
      .catch(this.handleError);
  }

  fetchItem(id: number): Observable<Item> {
    return this.http.get(prefix + "item/" + id + ".json")
      .map(res => res.json())
      .catch(this.handleError);
  }

  private fetchItems(res: Response) {
    return res.json() || [];
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
