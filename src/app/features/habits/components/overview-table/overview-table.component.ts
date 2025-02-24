import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {TitleCasePipe} from "@angular/common";
import {CardComponent} from '../../../../shared/components/card/card.component';
import {HabitEntriesService} from '../../services/habit-entries.service';

@Component({
  selector: 'app-overview-table',
  imports: [
    CardComponent,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatTable,
    MatColumnDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    TitleCasePipe
  ],
  templateUrl: './overview-table.component.html',
  styleUrl: './overview-table.component.css'
})
export class OverviewTableComponent {
  displayedColumns: string[] = ['name', 'startTime', 'endTime'];

  constructor(protected habitEntriesService: HabitEntriesService) {}

  ngOnInit() {
    this.habitEntriesService.all();
    console.log(this.habitEntriesService.allHabitEntries$);
  }
}
