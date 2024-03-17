import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'City Weather'`, () => {
    expect(component.title).toEqual('City Weather');
  });

  it('should set the title as the page title on initialization', () => {
    const title = 'City Weather';
    component.title = title;
    fixture.detectChanges();
    expect(document.title).toEqual(title);
  });
});
