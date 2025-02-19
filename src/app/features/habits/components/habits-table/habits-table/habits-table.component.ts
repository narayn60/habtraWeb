import { Component } from '@angular/core';
import {HabitResponse, HabitsService} from '../../../habits.service';
import {
  MatTableModule
} from '@angular/material/table';
import {TitleCasePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-habits-table',
  imports: [
    MatTableModule,
    TitleCasePipe,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader
  ],
  templateUrl: './habits-table.component.html',
  styleUrl: './habits-table.component.css'
})
export class HabitsTableComponent {
  displayedColumns: string[] = ['name'];

  constructor(protected habitsService: HabitsService) {
  }

  ngOnInit() {
    this.habitsService.populate();
  }
}
