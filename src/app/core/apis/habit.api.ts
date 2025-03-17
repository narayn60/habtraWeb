import {Frequency} from '../../features/habits/types/types';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

export interface HabitResponse {
  id: string;
  name: string;
  frequency: Frequency;
  target: number;
  entries: HabitEntryResponse[];
}

export interface HabitEntryResponse {
  id: string,
  note: string
  startTime: string;
  endTime: string;
}

export interface HabitCreationRequest {
  habit: string;
  frequency: Frequency;
  target: number;
}

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
