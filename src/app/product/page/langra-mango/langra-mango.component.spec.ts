import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangraMangoComponent } from './langra-mango.component';

describe('LangraMangoComponent', () => {
  let component: LangraMangoComponent;
  let fixture: ComponentFixture<LangraMangoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangraMangoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangraMangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
