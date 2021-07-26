import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAmexComponent } from './home-amex.component';

describe('HomeAmexComponent', () => {
  let component: HomeAmexComponent;
  let fixture: ComponentFixture<HomeAmexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAmexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAmexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
