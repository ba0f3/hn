import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { APP_ROUTER_PROVIDERS, AppComponent, environment  } from './app/';
import { HTTP_PROVIDERS} from '@angular/http';
import { HnService } from './app/hn.service';
import { LocalStorageService } from './app/local-storage.service';



if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, HnService, LocalStorageService,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch(err => console.error(err));
