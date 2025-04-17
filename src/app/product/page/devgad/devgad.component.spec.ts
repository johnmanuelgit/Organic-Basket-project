import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevgadComponent } from './devgad.component';

describe('DevgadComponent', () => {
  let component: DevgadComponent;
  let fixture: ComponentFixture<DevgadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevgadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevgadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
