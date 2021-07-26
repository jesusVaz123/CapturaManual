import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuentepapelComponent } from './fuentepapel.component';

describe('FuentepapelComponent', () => {
  let component: FuentepapelComponent;
  let fixture: ComponentFixture<FuentepapelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuentepapelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuentepapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
