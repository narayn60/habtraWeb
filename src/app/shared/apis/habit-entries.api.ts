import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HabitEntryResponse, HabitEntryCreationRequest } from '../interfaces/habit-entries.interfaces';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitEntriesApi {

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<HabitEntryResponse[]>(environment.apiUrl + '/api/habitEntries');
  }

  forHabit(habitId: string) {
    return this.http.get<HabitEntryResponse[]>(environment.apiUrl + `/api/habitEntries/${habitId}`);
  }

  create(habitEntriesRequest: HabitEntryCreationRequest) {
    return this.http.post<HabitEntryResponse>(environment.apiUrl + '/api/habitEntries', habitEntriesRequest);
  }
}
