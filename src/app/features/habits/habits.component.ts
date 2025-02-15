import {Component, inject} from '@angular/core';
import {HabitsService} from './habits.service';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-habits',
  imports: [
    MatGridList,
    MatGridTile,
    MatButton
  ],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {
  readonly dialog = inject(MatDialog);

  constructor(private habitsService: HabitsService) {
  }

  ngOnInit() {
    this.habitsService.getAll();
  }

  openDialog() {
    const dialogRef = this.dialog.open()
  }
}
