import { async, TestBed } from '@angular/core/testing';
import { NgxHideableHeaderDemoModule } from './ngx-hideable-header-demo.module';

describe('NgxHideableHeaderDemoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxHideableHeaderDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxHideableHeaderDemoModule).toBeDefined();
  });
});
