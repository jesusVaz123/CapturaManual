import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturamanualComponent } from './capturamanual.component';

describe('CapturamanualComponent', () => {
  let component: CapturamanualComponent;
  let fixture: ComponentFixture<CapturamanualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturamanualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturamanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
