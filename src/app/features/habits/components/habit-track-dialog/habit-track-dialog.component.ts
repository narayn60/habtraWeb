import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {HabitsService} from '../../services/habits.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TitleCasePipe} from '@angular/common';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';
import {HabitEntriesService} from '../../services/habit-entries.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-habit-track-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatTimepickerInput,
    MatTimepickerToggle,
    MatSuffix,
    MatTimepicker,
    MatInput,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './habit-track-dialog.component.html',
  styleUrl: './habit-track-dialog.component.css'
})
export class HabitTrackDialogComponent {
  readonly dialogRef = inject(MatDialogRef<HabitTrackDialogComponent>);
  data: {habitId: string} = inject(MAT_DIALOG_DATA);
  trackForm = new FormGroup({
    startTime: new FormControl<Date>(new Date(), Validators.required),
    endTime: new FormControl<Date>(new Date(), Validators.required),
  });

  constructor(private habitEntriesService: HabitEntriesService) {}

  onSubmit() {
    this.habitEntriesService.create({
      habitId: this.data.habitId,
      startTime: this.trackForm.value.startTime,
      endTime: this.trackForm.value.endTime
    }, () => this.dialogRef.close());
  }
}
