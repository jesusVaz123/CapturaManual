import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazosBanorteComponent } from './rechazos-banorte.component';

describe('RechazosBanorteComponent', () => {
  let component: RechazosBanorteComponent;
  let fixture: ComponentFixture<RechazosBanorteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazosBanorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazosBanorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
