import {Component, inject} from '@angular/core';
import {HabitResponse, HabitsService} from '../../../habits.service';
import {
  MatTableModule
} from '@angular/material/table';
import {TitleCasePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {HabitTrackDialogComponent} from '../../habit-track-dialog/habit-track-dialog.component';

@Component({
  selector: 'app-habits-table',
  imports: [
    MatTableModule,
    TitleCasePipe,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatButton
  ],
  templateUrl: './habits-table.component.html',
  styleUrl: './habits-table.component.css'
})
export class HabitsTableComponent {
  readonly trackDialog = inject(MatDialog);
  displayedColumns: string[] = ['name', 'actions'];

  constructor(protected habitsService: HabitsService) {
  }

  ngOnInit() {
    this.habitsService.populate();
  }

  openTrackDialog() {
    const dialogRef = this.trackDialog.open(HabitTrackDialogComponent, {
      data: {}
    });
  }
}
