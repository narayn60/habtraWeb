import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

interface HabitEntriesResponse {
  id: string;
  startTime: Date;
  endTime: Date;
  habit: {id: string; name: string};
}

interface HabitEntriesCreateionRequest {
  habitId: string;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class HabitEntriesService {
  readonly allHabitEntries$ = new BehaviorSubject<HabitEntriesResponse[]>([]);
  readonly habitEntries$ = new BehaviorSubject<HabitEntriesResponse[]>([]);

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<HabitEntriesResponse[]>(environment.apiUrl + '/api/habitEntries').subscribe({
      next: resp => {
        resp = resp.map(habit =>  ({
          ...habit,
          startTime: new Date(habit.startTime),
          endTime: new Date(habit.endTime)
        }));
        this.allHabitEntries$.next(resp)
      },
      error: err => console.error(err)
    });
  }

  forHabit(habitId: string) {
    return this.http.get<HabitEntriesResponse[]>(environment.apiUrl + `/api/habitEntries/${habitId}`).subscribe({
      next: resp => this.habitEntries$.next(resp),
      error: err => console.error(err)
    });
  }

  create(habitEntriesRequest: HabitEntriesCreateionRequest, callback: () => void) {
    return this.http.post<HabitEntriesCreateionRequest>(environment.apiUrl + '/api/habitEntries', habitEntriesRequest).subscribe({
      next: resp => {
        this.all();
        callback();
      },
      error: err => console.error(err)
    })
  }
}
