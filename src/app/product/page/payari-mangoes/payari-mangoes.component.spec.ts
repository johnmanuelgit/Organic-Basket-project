import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayariMangoesComponent } from './payari-mangoes.component';

describe('PayariMangoesComponent', () => {
  let component: PayariMangoesComponent;
  let fixture: ComponentFixture<PayariMangoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayariMangoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayariMangoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
