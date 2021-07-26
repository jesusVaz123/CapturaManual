/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CargaadquirenteComponent } from './cargaadquirente.component';

describe('CargaadquirenteComponent', () => {
  let component: CargaadquirenteComponent;
  let fixture: ComponentFixture<CargaadquirenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaadquirenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaadquirenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
