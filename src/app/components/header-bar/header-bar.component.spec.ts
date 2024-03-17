import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarComponent } from './header-bar.component';

describe('HeaderBarComponent', () => {
  let component: HeaderBarComponent;
  let fixture: ComponentFixture<HeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title input', () => {
    const testTitle = 'Test Title';
    component.title = testTitle;
    fixture.detectChanges();
    expect(component.title).toEqual(testTitle);
  });

  it('should render an H1 element with the correct title', () => {
    const testTitle = 'Test Title';
    component.title = testTitle;
    fixture.detectChanges();

    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element).toBeTruthy();
    expect(h1Element.textContent).toContain('Test Title');
  });
});
