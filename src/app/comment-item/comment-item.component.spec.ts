/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CommentItemComponent } from './comment-item.component';

describe('Component: CommentItem', () => {
  it('should create an instance', inject([CommentItemComponent], (comp: CommentItemComponent) => {
    expect(comp).toBeTruthy();
  }))
});
