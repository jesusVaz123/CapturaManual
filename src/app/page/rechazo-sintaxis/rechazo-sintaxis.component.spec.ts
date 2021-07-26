import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoSintaxisComponent } from './rechazo-sintaxis.component';

describe('RechazoSintaxisComponent', () => {
  let component: RechazoSintaxisComponent;
  let fixture: ComponentFixture<RechazoSintaxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazoSintaxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazoSintaxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
