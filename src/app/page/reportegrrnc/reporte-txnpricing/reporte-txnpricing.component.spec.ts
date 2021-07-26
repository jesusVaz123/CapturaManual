import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTxnpricingComponent } from './reporte-txnpricing.component';

describe('ReporteTxnpricingComponent', () => {
  let component: ReporteTxnpricingComponent;
  let fixture: ComponentFixture<ReporteTxnpricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTxnpricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTxnpricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
