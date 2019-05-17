import { async, TestBed } from '@angular/core/testing';
import { NgxTiltedPageScrollModule } from './ngx-tilted-scroll.module';

describe('NgxTiltedPageScrollModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTiltedPageScrollModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxTiltedPageScrollModule).toBeDefined();
  });
});
