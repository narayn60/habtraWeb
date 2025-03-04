import { Component } from '@angular/core';
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
import {DatePipePipe} from '../../../../shared/pipes/date-pipe.pipe';
import {HabitEntriesService} from '../../../../core/services/habit-entries.service';

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
    TitleCasePipe,
    DatePipePipe
  ],
  templateUrl: './overview-table.component.html',
  styleUrl: './overview-table.component.css'
})
export class OverviewTableComponent {
  displayedColumns: string[] = ['name', 'startTime', 'endTime', 'duration'];

  constructor(protected habitEntriesService: HabitEntriesService) {}

  ngOnInit() {
    this.habitEntriesService.all();
  }

  protected readonly Date = Date;
}
