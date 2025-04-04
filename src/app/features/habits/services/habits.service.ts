import {computed, inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {HabitApi} from '../../../shared/apis/habit.api';
import { HabitEntryCreationRequest } from '../../../shared/interfaces/habit-entries.interfaces';
import { HabitResponse, HabitCreationRequest } from '../../../shared/interfaces/habit.interfaces';
import {HabitEntriesApi} from '../../../shared/apis/habit-entries.api';
import {Habit} from '../../../shared/models/habit.model';

interface HabitState { [key: string]: Habit; }

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  readonly habits = computed(() => Object.values(this._habitState()));

  private _habitState = signal<HabitState>({});
  private api: HabitApi = inject(HabitApi);
  private entriesApi: HabitEntriesApi = inject(HabitEntriesApi);

  all() {
    return this.api.all().subscribe({
      next: resp => {
        const habits = resp.map(habit => new Habit(habit));
        this._habitState.set(this.createState(habits));
      },
      error: (err) => console.error(err)
    });
  }

  create(habitRequest: HabitCreationRequest, complete: () => void) {
    return this.api.create(habitRequest).subscribe({
      next: (resp: HabitResponse) => {
        this.updateState(new Habit(resp));
      },
      error: (err) => console.log("Error creating Habit", err),
      complete: complete
    })
  }

  get(habitId: string) {
    return this.api.get(habitId).subscribe({
      next: resp => this.updateState(new Habit(resp)),
      error: (err) => console.error(err)
    });
  }

  addHabitEntry(habitEntriesRequest: HabitEntryCreationRequest, complete: () => void) {
    return this.entriesApi.create(habitEntriesRequest).subscribe({
      next: resp => this.get(habitEntriesRequest.habitId),
      error: err => console.error(err),
      complete: complete
    })
  }

  private createState(habits: Habit[]): HabitState {
    return habits.reduce( (acc, entry) => ({...acc, [entry.name]: entry}), {} )
  }

  private updateState(habit: Habit): void {
    this._habitState.update(value => ({ ...value, [habit.name]: habit }));
  }
}
