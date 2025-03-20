import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HabitEntriesApi} from '../apis/habit-entries.api';
import {HabitEntryCreationRequest, HabitEntryResponse} from '../interfaces/habit-entries.interfaces';
import {HabitEntry} from '../models/habit-entry.model';

@Injectable({
  providedIn: 'root'
})
export class HabitEntriesService {
  allHabitEntries = signal<HabitEntry[]>([]);
  habitEntries$ = signal<HabitEntry[]>([]);

  constructor(private api: HabitEntriesApi) { }

  all() {
    return this.api.all().subscribe({
      next: resp => {
        this.allHabitEntries.set(
          resp.map(entry => new HabitEntry(entry))
        );
      },
      error: console.error
    });
  }

  forHabit(habitId: string) {
    return this.api.forHabit(habitId).subscribe({
      next: resp => this.habitEntries$.set(
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
