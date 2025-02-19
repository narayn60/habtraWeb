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
import {HabitsService} from '../../habits.service';

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
  habits: Habit[] = [
    {name: 'guitar'},
    {name: 'gym'}
  ]
  customHabit = false;
  habitForm = new FormGroup({
    habit: new FormControl<string>('', Validators.required)
  })

  constructor(private habitsService: HabitsService) {
  }

  onSubmit() {
    if (this.habitForm.value.habit) {
      this.habitsService.createHabit({habit: this.habitForm.value.habit}, () => this.dialogRef.close());
    }
  }

  toggleCustom() {
    this.habitForm.reset({habit: ''});
    this.customHabit = !this.customHabit;
  }
}
