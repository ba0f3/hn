import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {}

  get(key: string, _default: any) {
    let ret = window.localStorage.getItem(key);
    if(!ret)
      return _default;
    return JSON.parse(ret);
  }

  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  getTemp(key: string, _default: any) {
    let ret = window.localStorage.getItem(key);
    if(!ret)
      return _default;
    return JSON.parse(ret);
  }

  setTemp(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
}
