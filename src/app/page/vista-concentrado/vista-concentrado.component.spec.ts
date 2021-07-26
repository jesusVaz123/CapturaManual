import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaConcentradoComponent } from './vista-concentrado.component';

describe('VistaConcentradoComponent', () => {
  let component: VistaConcentradoComponent;
  let fixture: ComponentFixture<VistaConcentradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaConcentradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaConcentradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
