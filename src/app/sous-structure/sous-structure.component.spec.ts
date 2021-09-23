import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousStructureComponent } from './sous-structure.component';

describe('SousStructureComponent', () => {
  let component: SousStructureComponent;
  let fixture: ComponentFixture<SousStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
