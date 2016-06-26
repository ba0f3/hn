/**
 * Created by rgv151 on 6/26/16.
 */

import { provideRouter, RouterConfig } from '@angular/router';

import { DummyComponent } from './dummy'
import { ItemViewComponent }  from './item-view';
import { CommentViewComponent } from './comment-view'


export const routes: RouterConfig = [
  { path: '', component: DummyComponent },
  { path: 'article/:id', component: ItemViewComponent },
  { path: 'comments/:id', component: CommentViewComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
