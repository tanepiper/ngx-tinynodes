import { async, TestBed } from '@angular/core/testing';
import { NgxTinynodesCoreModule } from './ngx-tinynodes-core.module';

describe('NgxTinynodesCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTinynodesCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxTinynodesCoreModule).toBeDefined();
  });
});
