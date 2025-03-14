import {Component, Input} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {DatePipePipe} from '../../../../shared/pipes/date-pipe.pipe';

@Component({
  selector: 'app-overview-table',
  imports: [
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
    DatePipePipe
  ],
  templateUrl: './overview-table.component.html',
  styleUrl: './overview-table.component.css'
})
export class OverviewTableComponent {
  @Input() entries: {
    startTime: Date;
    endTime: Date;
  }[] = [];
  displayedColumns: string[] = ['startTime', 'endTime', 'duration'];
}
