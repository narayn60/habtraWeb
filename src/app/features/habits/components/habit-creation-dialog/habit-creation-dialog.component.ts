import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatStepLabel, MatStepper, MatStepperNext} from '@angular/material/stepper';

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
  ],
  templateUrl: './habit-creation-dialog.component.html',
  styleUrl: './habit-creation-dialog.component.css'
})
export class HabitCreationDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  habits: Habit[] = [
    {name: 'guitar'},
    {name: 'gym'}
  ]
  customHabit = false;
  habitControl = new FormControl<String | null>(null, Validators.required);

  onSubmit() {

  }
}
