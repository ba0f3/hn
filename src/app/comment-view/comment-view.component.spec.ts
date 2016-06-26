/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CommentViewComponent } from './comment-view.component';

describe('Component: CommentView', () => {
  it('should create an instance', () => {
    let component = new CommentViewComponent();
    expect(component).toBeTruthy();
  });
});
