import {Component, computed, inject, input, Input, InputSignal} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {TitleCasePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {HabitTrackDialogComponent} from '../habit-track-dialog/habit-track-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Habit} from '../../../../core/models/habit.model';

@Component({
  selector: 'app-habit-card',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    TitleCasePipe,
    MatCardActions,
    MatButton,
  ],
  templateUrl: './habit-card.component.html',
  styleUrl: './habit-card.component.css'
})
export class HabitCardComponent {
  habit = input.required<Habit>();
  readonly trackDialog = inject(MatDialog);

  openTrackDialog() {
    this.trackDialog.open(HabitTrackDialogComponent, {
      data: {
        habitId: this.habit().id,
        name: this.habit().name,
      }
    });
  }

  protected readonly Number = Number;
}
