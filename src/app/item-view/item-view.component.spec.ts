/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ItemViewComponent } from './item-view.component';

describe('Component: ItemView', () => {
  it('should create an instance', inject([ItemViewComponent], (comp: ItemViewComponent) => {
    expect(comp).toBeTruthy();
  }));
});
