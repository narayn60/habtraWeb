import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HabitResponse, HabitCreationRequest} from '../interfaces/habit.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HabitApi {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<HabitResponse[]>(environment.apiUrl + '/api/habits');
  }

  create(habitRequest: HabitCreationRequest) {
    return this.http.post<HabitResponse>(environment.apiUrl + '/api/habits', habitRequest);
  }

  get(habitId: string) {
    return this.http.get<HabitResponse>(environment.apiUrl + `/api/habits/${habitId}`);
  }
}
