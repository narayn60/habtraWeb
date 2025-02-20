import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTrackDialogComponent } from './habit-track-dialog.component';

describe('HabitTrackDialogComponent', () => {
  let component: HabitTrackDialogComponent;
  let fixture: ComponentFixture<HabitTrackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitTrackDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
