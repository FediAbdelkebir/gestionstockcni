import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBCEComponent } from './gestion-bce.component';

describe('GestionBCEComponent', () => {
  let component: GestionBCEComponent;
  let fixture: ComponentFixture<GestionBCEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionBCEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionBCEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
