import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandebceComponent } from './commandebce.component';

describe('CommandebceComponent', () => {
  let component: CommandebceComponent;
  let fixture: ComponentFixture<CommandebceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandebceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandebceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
