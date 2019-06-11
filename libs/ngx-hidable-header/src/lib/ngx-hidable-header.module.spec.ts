import { async, TestBed } from '@angular/core/testing';
import { NgxHidableHeaderModule } from './ngx-hidable-header.module';

describe('NgxHidableHeaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxHidableHeaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxHidableHeaderModule).toBeDefined();
  });
});
