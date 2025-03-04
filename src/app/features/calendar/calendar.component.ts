import { Component } from '@angular/core';
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarModule} from '@fullcalendar/angular';
import {HabitEntriesService} from '../../core/services/habit-entries.service';
import {async} from 'rxjs';

@Component({
  selector: 'app-calendar',
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  events: EventInput[] = [];

  constructor (private service: HabitEntriesService) { }

  ngOnInit() {
    this.service.all();

    this.service.allHabitEntries$.subscribe(value => {
      this.events = value.map(value => ({
        title: value.habit.name,
        start: value.startTime,
        end: value.endTime,
      }))
    })
  }
}
