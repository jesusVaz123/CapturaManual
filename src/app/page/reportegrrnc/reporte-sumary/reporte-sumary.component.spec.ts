import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSumaryComponent } from './reporte-sumary.component';

describe('ReporteSumaryComponent', () => {
  let component: ReporteSumaryComponent;
  let fixture: ComponentFixture<ReporteSumaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSumaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
