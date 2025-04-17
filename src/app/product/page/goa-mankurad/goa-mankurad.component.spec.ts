import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaMankuradComponent } from './goa-mankurad.component';

describe('GoaMankuradComponent', () => {
  let component: GoaMankuradComponent;
  let fixture: ComponentFixture<GoaMankuradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoaMankuradComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoaMankuradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
