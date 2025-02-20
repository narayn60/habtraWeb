import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

interface HabitCreationRequest {
  habit: string
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

  populate() {
    return this.http.get<HabitResponse[]>('http://localhost:8080/api/habits').subscribe({
      next: (resp) => this.habits$.next(resp),
      error: (err) => console.error(err)
    });
  }

  createHabit(habitRequest: HabitCreationRequest, callback: () => void) {
    return this.http.post<HabitCreationRequest>('http://localhost:8080/api/habits', habitRequest).subscribe({
      next: (res) => {
        this.populate();
        callback();
      },
      error: (err) => console.log("Error creating Habit", err)
    })
  }
}
