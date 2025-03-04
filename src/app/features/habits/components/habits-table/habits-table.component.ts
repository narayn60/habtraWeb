import {Component, inject} from '@angular/core';
import {HabitsService} from '../../services/habits.service';
import {
  MatTableModule
} from '@angular/material/table';
import {TitleCasePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {HabitTrackDialogComponent} from '../habit-track-dialog/habit-track-dialog.component';
import {CardComponent} from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-habits-table',
  imports: [
    MatTableModule,
    TitleCasePipe,
    MatButton,
    CardComponent
  ],
  templateUrl: './habits-table.component.html',
  styleUrl: './habits-table.component.css'
})
export class HabitsTableComponent {
  readonly trackDialog = inject(MatDialog);
  displayedColumns: string[] = ['name', 'frequency', 'target', 'actions'];

  constructor(protected habitsService: HabitsService) {
  }

  ngOnInit() {
    this.habitsService.all();
  }

  openTrackDialog(habitId: string, name: string) {
    const dialogRef = this.trackDialog.open(HabitTrackDialogComponent, {
      data: {
        habitId,
        name
      }
    });
  }
}
