import {Frequency} from '../../features/habits/types/types';
import {HabitEntry} from './habit-entry.model';
import { HabitResponse } from '../interfaces/habit.interfaces';
import {buildEntryKey} from '@fullcalendar/core/internal';

export class Habit {
  id: string;
  name: string;
  frequency: Frequency;
  target: number;
  entries: HabitEntry[];

  constructor({id, name, frequency, target, entries}: HabitResponse) {
    this.id = id;
    this.name = name;
    this.frequency = frequency;
    this.target = target;
    this.entries = entries.map(entry => new HabitEntry(entry));
  }

  getProgress() {
    let today: string = new Date().toDateString();
    const progressToday =
      this.entries
        .filter(entry => entry.endTime.toDateString() == today)
        .reduce((acc, { startTime, endTime }) => {
          return acc + (endTime.getTime() - startTime.getTime()) / 60000;
        }, 0);

    return (progressToday / this.target) * 100;
  }
}
