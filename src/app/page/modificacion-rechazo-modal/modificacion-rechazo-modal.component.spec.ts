import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionRechazoModalComponent } from './modificacion-rechazo-modal.component';

describe('ModificacionRechazoModalComponent', () => {
  let component: ModificacionRechazoModalComponent;
  let fixture: ComponentFixture<ModificacionRechazoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionRechazoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionRechazoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
