import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazosComponent } from './rechazos.component';

describe('RechazosComponent', () => {
  let component: RechazosComponent;
  let fixture: ComponentFixture<RechazosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
