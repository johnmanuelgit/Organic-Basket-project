import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatnagiriAlphonsoComponent } from './ratnagiri-alphonso.component';

describe('RatnagiriAlphonsoComponent', () => {
  let component: RatnagiriAlphonsoComponent;
  let fixture: ComponentFixture<RatnagiriAlphonsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatnagiriAlphonsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatnagiriAlphonsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
