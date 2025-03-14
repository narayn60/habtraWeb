import {Component, inject, Input} from '@angular/core';
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
    MatButton
  ],
  templateUrl: './habit-card.component.html',
  styleUrl: './habit-card.component.css'
})
export class HabitCardComponent {
  @Input() title: string = '';
  @Input() frequency: string = '';
  @Input() habitId: string = '';
  readonly trackDialog = inject(MatDialog);

  openTrackDialog() {
    this.trackDialog.open(HabitTrackDialogComponent, {
      data: {
        habitId: this.habitId,
        name: this.title
      }
    });
  }
}
