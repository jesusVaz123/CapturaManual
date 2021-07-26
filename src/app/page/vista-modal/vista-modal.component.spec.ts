import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaModalComponent } from './vista-modal.component';

describe('VistaModalComponent', () => {
  let component: VistaModalComponent;
  let fixture: ComponentFixture<VistaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
