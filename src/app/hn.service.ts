import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';


import './rxjs-operators';
import { Item } from './models';

const ws_prefix = "//ws.huy.im"
const prefix =  "https://hacker-news.firebaseio.com/v0/";

@Injectable()
export class HnService {
  constructor (private http: Http) {}

  private topStories = prefix + 'topstories.json';

  getTopStories (): Observable<number[]> {
    return this.http.get(this.topStories)
      .map(this.parseJson)
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
          console.log("Fetch comment: " + kids[i]);
          this.fetchItem(kids[i]).subscribe((item: Item) => {
            if(item.kids) {
              this.fetchKids(item.kids).subscribe(item => ob.next(item));
            }
            ob.next(item);
          });
        }
      }
    )

  }


  fetchContent(url: string, id: number): Observable<any> {
    return this.http.get(ws_prefix + "/?url=" + encodeURIComponent(url) + "&id=" + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private parseJson(res: Response) {
    return res.json() || [];
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
