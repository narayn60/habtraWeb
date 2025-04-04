import {Component, computed, input, Input} from '@angular/core';
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
  // inputs
  entries = input<{startTime: Date, endTime: Date}[]>([]);
  sorted_entries = computed(() =>
    this.entries().toSorted((a, b) => a.startTime.getTime() - b.startTime.getTime())
  );

  displayedColumns: string[] = ['startTime', 'endTime', 'duration'];
  formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'UTC',
  })

  getDuration(startTime: Date, endTime: Date) {
    return this.formatter.format(endTime.getTime() - startTime.getTime());
  }
}
