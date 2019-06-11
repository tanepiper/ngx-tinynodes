import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHidableHeaderDemoComponent } from './ngx-hidable-header-demo.component';

describe('NgxHidableHeaderDemoComponent', () => {
  let component: NgxHidableHeaderDemoComponent;
  let fixture: ComponentFixture<NgxHidableHeaderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxHidableHeaderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHidableHeaderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
