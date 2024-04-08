import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitePensionComponent } from './tramite-pension.component';

describe('TramitePensionComponent', () => {
  let component: TramitePensionComponent;
  let fixture: ComponentFixture<TramitePensionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TramitePensionComponent]
    });
    fixture = TestBed.createComponent(TramitePensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
