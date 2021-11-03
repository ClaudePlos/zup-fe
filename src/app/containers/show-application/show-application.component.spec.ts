import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowApplicationComponent } from './show-application.component';

describe('ShowApplicationComponent', () => {
  let component: ShowApplicationComponent;
  let fixture: ComponentFixture<ShowApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
