import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaarchivoComponent } from './consultaarchivo.component';

describe('ConsultaarchivoComponent', () => {
  let component: ConsultaarchivoComponent;
  let fixture: ComponentFixture<ConsultaarchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaarchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaarchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
