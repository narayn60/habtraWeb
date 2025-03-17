import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {HabitApi, HabitCreationRequest, HabitResponse} from '../../../core/apis/habit.api';
import {HabitEntriesApi, HabitEntriesCreationRequest} from '../../../core/apis/habit-entries.api';
import {Habit} from '../../../core/models/habit.model';
import {HabitEntry} from '../../../core/models/habit-entry.model';

interface HabitState { [key: string]: Habit; }

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  private readonly _habitsState$ = new BehaviorSubject<HabitState>({});
  readonly habits$ = this._habitsState$.pipe(
    map((habit: HabitState) => Object.values(habit))
  )

  constructor(private api: HabitApi, private entriesApi: HabitEntriesApi) {}

  all() {
    return this.api.all().subscribe({
      next: resp => {
        const habits = resp.map(habit => new Habit(habit));
        const updatedState = this.createState(habits);

        return this._habitsState$.next(updatedState);
      },
      error: (err) => console.error(err)
    });
  }

  create(habitRequest: HabitCreationRequest, complete: () => void) {
    return this.api.create(habitRequest).subscribe({
      next: (resp: HabitResponse) => {
        const habit = new Habit(resp);
        this.updateState(habit);
      },
      error: (err) => console.log("Error creating Habit", err),
      complete: complete
    })
  }

  get(habitId: string) {
    return this.api.get(habitId).subscribe({
      next: resp => {
        const habit = new Habit(resp);
        return this.updateState(habit);
      },
      error: (err) => console.error(err)
    });
  }

  addHabitEntry(habitEntriesRequest: HabitEntriesCreationRequest, complete: () => void) {
    return this.entriesApi.create(habitEntriesRequest).subscribe({
      next: resp => {
        this.get(habitEntriesRequest.habitId);
      },
      error: err => console.error(err),
      complete: complete
    })
  }

  private createState(habits: Habit[]): HabitState {
    return habits.reduce(
      (acc, entry) => ({...acc, [entry.name]: entry}),
      {}
    )
  }

  private updateState(habit: Habit) {
    const updatedState = {
      ...this._habitsState$.getValue(),
      [habit.name]: habit
    }

    return this._habitsState$.next(updatedState);
  }
}
