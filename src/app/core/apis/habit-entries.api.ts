import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface HabitEntriesResponse {
  id: string;
  startTime: Date;
  endTime: Date;
  habit: {id: string; name: string};
}

export interface HabitEntriesCreationRequest {
  habitId: string;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class HabitEntriesApi {

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<HabitEntriesResponse[]>(environment.apiUrl + '/api/habitEntries');
  }

  forHabit(habitId: string) {
    return this.http.get<HabitEntriesResponse[]>(environment.apiUrl + `/api/habitEntries/${habitId}`);
  }

  create(habitEntriesRequest: HabitEntriesCreationRequest) {
    return this.http.post<HabitEntriesResponse>(environment.apiUrl + '/api/habitEntries', habitEntriesRequest);
  }
}
