import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';


import './rxjs-operators';
import { Item } from './models';

const ws_prefix = "https://ws.huy.im"
const prefix =  "https://hacker-news.firebaseio.com/v0/";

@Injectable()
export class HnService {
  constructor (private http: Http) {}

  private TOP_STORIES = prefix + 'topstories.json';
  private BEST_STORIES = prefix + 'beststories.json';
  private NEW_STORIES = prefix + 'newstories.json';

  private ASK_STORIES = prefix + 'askstories.json';
  private SHOW_STORIES = prefix + 'showstories.json';
  private JOB_STORIES = prefix + 'jobstories.json';



  getTopStories(): Observable<number[]> {
    return this.http.get(this.TOP_STORIES)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getBestStories(): Observable<number[]> {
    return this.http.get(this.BEST_STORIES)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getNewStories(): Observable<number[]> {
    return this.http.get(this.NEW_STORIES)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAskStories(): Observable<number[]> {
    return this.http.get(this.ASK_STORIES)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getShowStories(): Observable<number[]> {
    return this.http.get(this.SHOW_STORIES)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getJobStories(): Observable<number[]> {
    return this.http.get(this.JOB_STORIES)
      .map(res => res.json())
      .catch(this.handleError);
  }

  fetchItem(id: number): Observable<Item> {
    return this.http.get(prefix + "item/" + id + ".json")
      .map(res => res.json())
      .catch(this.handleError);
  }

  fetchKids(kids: number[]): Observable<Item> {
    return new Observable<Item>((ob: Observer<Item>) => {
      for(let i in kids) {
        this.fetchItem(kids[i]).subscribe((item: Item) => {
          if(item.kids) {
            this.fetchKids(item.kids).subscribe(item => ob.next(item));
          }
          ob.next(item);
        });
      }
    })
  }

  fetchContent(url: string, id: number): Observable<any> {
    return this.http.get(ws_prefix + "/?url=" + encodeURIComponent(url) + "&id=" + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
