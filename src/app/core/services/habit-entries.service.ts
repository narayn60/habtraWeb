import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HabitEntriesApi, HabitEntriesCreationRequest, HabitEntriesResponse} from '../apis/habit-entries.api';

@Injectable({
  providedIn: 'root'
})
export class HabitEntriesService {
  readonly allHabitEntries$ = new BehaviorSubject<HabitEntriesResponse[]>([]);
  readonly habitEntries$ = new BehaviorSubject<HabitEntriesResponse[]>([]);

  constructor(private api: HabitEntriesApi) { }

  all() {
    return this.api.all().subscribe({
      next: resp => {
        resp = resp.map(habit =>  ({
          ...habit,
          startTime: new Date(habit.startTime),
          endTime: new Date(habit.endTime)
        }));
        this.allHabitEntries$.next(resp)
      },
      error: console.error
    });
  }

  forHabit(habitId: string) {
    return this.api.forHabit(habitId).subscribe({
      next: resp => this.habitEntries$.next(resp),
      error: console.error
    });
  }

  create(habitEntriesRequest: HabitEntriesCreationRequest, callback: () => void) {
    return this.api.create(habitEntriesRequest).subscribe({
      next: resp => this.all(),
      error: console.error,
      complete: callback,
    })
  }
}
