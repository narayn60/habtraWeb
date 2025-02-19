import {Component, inject} from '@angular/core';
import {HabitsService} from './habits.service';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {HabitCreationDialogComponent} from './components/habit-creation-dialog/habit-creation-dialog.component';
import {HabitsTableComponent} from './components/habits-table/habits-table/habits-table.component';

@Component({
  selector: 'app-habits',
  imports: [
    MatGridList,
    MatGridTile,
    MatButton,
    HabitsTableComponent
  ],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {
  readonly dialog = inject(MatDialog);

  constructor(private habitsService: HabitsService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(HabitCreationDialogComponent, {
      data: {}
    });
  }
}
