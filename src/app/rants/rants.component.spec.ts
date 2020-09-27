import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RantsComponent } from './rants.component';

describe('RantsComponent', () => {
  let component: RantsComponent;
  let fixture: ComponentFixture<RantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
