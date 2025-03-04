import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelectModule} from '@angular/material/select';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {TitleCasePipe} from '@angular/common';
import {HabitsService} from '../../services/habits.service';
import {Frequency} from '../../types/types';

interface Habit {
  name: string;
}

@Component({
  selector: 'app-habit-creation-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOption,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    TitleCasePipe,
  ],
  templateUrl: './habit-creation-dialog.component.html',
  styleUrl: './habit-creation-dialog.component.css'
})
export class HabitCreationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<HabitCreationDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  // TODO: Create default habits
  habits: Habit[] = [
    {name: 'guitar'},
    {name: 'gym'}
  ]
  frequencies = Object.keys(Frequency);
  customHabit = false;
  habitForm = new FormGroup({
    habit: new FormControl<string>('', Validators.required),
    frequency: new FormControl<Frequency>(Frequency.Daily, Validators.required),
    target: new FormControl<number>(0, Validators.required),
  });

  constructor(private habitsService: HabitsService) {
  }

  onSubmit() {
    if (this.habitForm.value.habit && this.habitForm.value.frequency && this.habitForm.value.target) {
      this.habitsService.create({
        habit: this.habitForm.value.habit,
        frequency: this.habitForm.value.frequency,
        target: this.habitForm.value.target
      }, () => this.dialogRef.close());
    }
  }

  toggleCustom() {
    this.habitForm.reset({...this.habitForm.value, habit: ''});
    this.customHabit = !this.customHabit;
  }
}
