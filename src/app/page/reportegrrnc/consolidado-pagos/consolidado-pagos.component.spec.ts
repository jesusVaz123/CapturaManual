import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoPagosComponent } from './consolidado-pagos.component';

describe('ConsolidadoPagosComponent', () => {
  let component: ConsolidadoPagosComponent;
  let fixture: ComponentFixture<ConsolidadoPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadoPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
