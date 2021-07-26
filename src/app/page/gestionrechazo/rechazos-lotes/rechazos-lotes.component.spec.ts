import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazosLotesComponent } from './rechazos-lotes.component';

describe('RechazosLotesComponent', () => {
  let component: RechazosLotesComponent;
  let fixture: ComponentFixture<RechazosLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazosLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazosLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
