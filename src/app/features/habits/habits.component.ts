import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {HabitsService} from './habits.service';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {HabitCreationDialogComponent} from './components/habit-creation-dialog/habit-creation-dialog.component';
import {HabitsTableComponent} from './components/habits-table/habits-table/habits-table.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

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
export class HabitsComponent implements OnInit {
  @ViewChild('gridList', { static: true}) gridList!: ElementRef;

  readonly dialog = inject(MatDialog);
  columns!: number;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private habitsService: HabitsService) {}

  ngOnInit() {
    this.getBreakPoints();
  }

  private getBreakPoints() {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => this.getTiles());
  }

  private getTiles(): void {
    if (this.breakpointObserver.isMatched(Breakpoints.Medium) ||
      this.breakpointObserver.isMatched(Breakpoints.Small) ||
      this.breakpointObserver.isMatched(Breakpoints.XSmall)
    ) {
      this.columns = 1;
    } else {
      this.columns = 2;
    }
  }

  openDialog() {
    // TODO: Determine if we need this dialogRef
    const dialogRef = this.dialog.open(HabitCreationDialogComponent, {
      data: {}
    });
  }
}
