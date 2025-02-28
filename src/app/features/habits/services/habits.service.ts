import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Frequency} from '../types/types';

interface HabitCreationRequest {
  habit: string
  frequency: Frequency
  target: number
}

export interface HabitResponse {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  readonly habits$ = new BehaviorSubject<HabitResponse[]>([]);

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<HabitResponse[]>(environment.apiUrl + '/api/habits').subscribe({
      next: (resp) => this.habits$.next(resp),
      error: (err) => console.error(err)
    });
  }

  create(habitRequest: HabitCreationRequest, callback: () => void) {
    return this.http.post<HabitCreationRequest>(environment.apiUrl + '/api/habits', habitRequest).subscribe({
      next: (res) => {
        // TODO: Maybe can make this smarter
        this.all();
        callback();
      },
      error: (err) => console.log("Error creating Habit", err)
    })
  }
}
