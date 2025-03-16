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
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';
import {TitleCasePipe} from '@angular/common';

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
    TitleCasePipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './habit-track-dialog.component.html',
  styleUrl: './habit-track-dialog.component.css'
})
export class HabitTrackDialogComponent {
  readonly dialogRef = inject(MatDialogRef<HabitTrackDialogComponent>);
  data: {habitId: string, name: string} = inject(MAT_DIALOG_DATA);
  trackForm!: FormGroup;

  constructor(private habitService: HabitsService) {
    const startTime = new Date(Date.now());
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 10);
    // TODO: Figure out how to make this nicer
    this.trackForm = new FormGroup({
      startTime: new FormControl<Date>(startTime, Validators.required),
      endTime: new FormControl<Date>(endTime, Validators.required),
      note: new FormControl<string>(''),
    }, {validators: this.timeRangeValidator});
  }

  onSubmit() {
    this.habitService.addHabitEntry({
      ...this.trackForm.value,
      habitId: this.data.habitId,
    }, () => this.dialogRef.close());
  }

  timeRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startTime: Date = control.get('startTime')?.value;
    const endTime: Date = control.get('endTime')?.value;

    if (startTime && endTime && startTime.getTime() > endTime.getTime()) {
      return { TimeRangeError: true };
    }
    return null;
  }
}
