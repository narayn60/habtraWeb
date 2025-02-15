import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:8080/api/habits').subscribe(habits =>
      console.log("Habits: " + habits)
    );
  }
}
