import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {HabitsService} from '../../habits.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TitleCasePipe} from '@angular/common';
import {MatChip, MatChipSet} from '@angular/material/chips';

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
  ],
  templateUrl: './habit-track-dialog.component.html',
  styleUrl: './habit-track-dialog.component.css'
})
export class HabitTrackDialogComponent {
  readonly dialogRef = inject(MatDialogRef<HabitTrackDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  trackForm = new FormGroup({

  });

  constructor(private habitsService: HabitsService) {}

  onSubmit() {

  }

}
