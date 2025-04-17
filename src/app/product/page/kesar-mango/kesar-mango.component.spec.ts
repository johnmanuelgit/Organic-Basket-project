import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KesarMangoComponent } from './kesar-mango.component';

describe('KesarMangoComponent', () => {
  let component: KesarMangoComponent;
  let fixture: ComponentFixture<KesarMangoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KesarMangoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KesarMangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
