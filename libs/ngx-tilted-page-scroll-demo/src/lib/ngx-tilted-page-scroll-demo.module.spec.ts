import { async, TestBed } from '@angular/core/testing';
import { NgxTiltedPageScrollDemoModule } from './ngx-tilted-page-scroll-demo.module';

describe('NgxTiltedPageScrollDemoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTiltedPageScrollDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxTiltedPageScrollDemoModule).toBeDefined();
  });
});
