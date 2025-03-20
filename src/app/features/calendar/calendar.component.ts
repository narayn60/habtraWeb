import {Component, computed, inject} from '@angular/core';
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarModule} from '@fullcalendar/angular';
import {HabitEntriesService} from '../../shared/services/habit-entries.service';
import {async} from 'rxjs';
import {HabitsService} from '../habits/services/habits.service';

@Component({
  selector: 'app-calendar',
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  private service: HabitEntriesService = inject(HabitEntriesService);
  protected calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  protected events = computed(
    () =>
      this.service.allHabitEntries().map(value => ({
        title: value.habit.name,
        start: value.startTime,
        end: value.endTime,
      }))
  );

  ngOnInit() {
    this.service.all();
  }
}
