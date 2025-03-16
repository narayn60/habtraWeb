import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {HabitsService} from './services/habits.service';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {HabitCreationDialogComponent} from './components/habit-creation-dialog/habit-creation-dialog.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {HabitCardComponent} from './components/habit-card/habit-card.component';
import {OverviewTableComponent} from './components/overview-table/overview-table.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-habits',
  imports: [
    MatGridList,
    MatGridTile,
    MatButton,
    HabitCardComponent,
    OverviewTableComponent,
    AsyncPipe
  ],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent implements OnInit {
  @ViewChild('gridList', { static: true}) gridList!: ElementRef;

  readonly dialog = inject(MatDialog);
  columns!: number;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(protected habitsService: HabitsService) {}

  ngOnInit() {
    this.getBreakPoints();
    this.habitsService.all();
  }

  private getBreakPoints() {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => this.getTiles());
  }

  private getTiles(): void {
    this.columns = (this.breakpointObserver.isMatched(Breakpoints.Medium) ||
      this.breakpointObserver.isMatched(Breakpoints.Small) ||
      this.breakpointObserver.isMatched(Breakpoints.XSmall)
    ) ? 1 : 3;
  }

  openDialog() {
    this.dialog.open(HabitCreationDialogComponent, {
      data: {}
    });
  }

  protected readonly Object = Object;
}
