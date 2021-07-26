import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSubmissionComponent } from './reporte-submission.component';

describe('ReporteSubmissionComponent', () => {
  let component: ReporteSubmissionComponent;
  let fixture: ComponentFixture<ReporteSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
