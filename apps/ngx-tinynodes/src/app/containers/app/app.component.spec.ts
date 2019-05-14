import { TestBed, async } from '@angular/core/testing';
import { AppContainerComponent } from './app.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SidebarComponent } from '../../components/sidebar-component/sidebar.component';
import { MatSidenavModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ApplicationDataModule } from '../../store/app/application.module';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterModule.forRoot([]),
        ApplicationDataModule,
        HttpClientModule,
        NoopAnimationsModule
      ],
      declarations: [AppContainerComponent, NavBarComponent, SidebarComponent],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppContainerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call onDestroy$ when destroyed', () => {
    const fixture = TestBed.createComponent(AppContainerComponent);
    const app = fixture.debugElement.componentInstance;

    spyOn(app.onDestroy$, 'next');
    app.ngOnDestroy();
    expect(app.onDestroy$.next).toHaveBeenCalledWith(true);
  });

  it('should hide the toolbar when app state is set', () => {});

  // it(`should have as title 'ngx-tinynodes'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('ngx-tinynodes');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to ngx-tinynodes!');
  // });
});
