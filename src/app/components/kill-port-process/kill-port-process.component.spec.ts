import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KillPortProcessComponent } from './kill-port-process.component';

describe('KillPortProcessComponent', () => {
  let component: KillPortProcessComponent;
  let fixture: ComponentFixture<KillPortProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KillPortProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KillPortProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
