import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitCreationDialogComponent } from './habit-creation-dialog.component';

describe('HabitCreationDialogComponent', () => {
  let component: HabitCreationDialogComponent;
  let fixture: ComponentFixture<HabitCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitCreationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
