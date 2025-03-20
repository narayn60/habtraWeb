import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {inject, Injectable} from '@angular/core';
import {HabitResponse, HabitCreationRequest} from '../interfaces/habit.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HabitApi {
  private http: HttpClient = inject(HttpClient);

  all() {
    return this.http.get<HabitResponse[]>(environment.apiUrl + `/api/habits?day=${this.getDay()}`);
  }

  create(habitRequest: HabitCreationRequest) {
    return this.http.post<HabitResponse>(environment.apiUrl + '/api/habits', habitRequest);
  }

  get(habitId: string) {
    return this.http.get<HabitResponse>(environment.apiUrl + `/api/habits/${habitId}?day=${this.getDay()}`);
  }

  private getDay() {
    return (new Date()).toLocaleDateString("en-GB", { // you can use undefined as first argument
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }
}
