import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HabitEntriesApi} from '../apis/habit-entries.api';
import {HabitEntryCreationRequest, HabitEntryResponse} from '../interfaces/habit-entries.interfaces';
import {HabitEntry} from '../models/habit-entry.model';

@Injectable({
  providedIn: 'root'
})
export class HabitEntriesService {
  readonly allHabitEntries$ = new BehaviorSubject<HabitEntry[]>([]);
  readonly habitEntries$ = new BehaviorSubject<HabitEntry[]>([]);

  constructor(private api: HabitEntriesApi) { }

  all() {
    return this.api.all().subscribe({
      next: resp => {
        this.allHabitEntries$.next(
          resp.map(entry => new HabitEntry(entry))
        );
      },
      error: console.error
    });
  }

  forHabit(habitId: string) {
    return this.api.forHabit(habitId).subscribe({
      next: resp => this.habitEntries$.next(
        resp.map(entry => new HabitEntry(entry))
      ),
      error: console.error
    });
  }

  create(habitEntriesRequest: HabitEntryCreationRequest, callback: () => void) {
    return this.api.create(habitEntriesRequest).subscribe({
      next: resp => this.all(),
      error: console.error,
      complete: callback,
    })
  }
}
