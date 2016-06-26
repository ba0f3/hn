/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { PrettyUrlPipe } from './pretty-url.pipe';

describe('Pipe: PrettyUrl', () => {
  it('create an instance', () => {
    let pipe = new PrettyUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
