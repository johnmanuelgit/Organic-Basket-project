import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatnaAlphonsoComponent } from './ratna-alphonso.component';

describe('RatnaAlphonsoComponent', () => {
  let component: RatnaAlphonsoComponent;
  let fixture: ComponentFixture<RatnaAlphonsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatnaAlphonsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatnaAlphonsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
