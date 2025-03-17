import {Frequency} from '../../features/habits/types/types';
import {HabitEntry} from './habit-entry.model';
import {HabitResponse} from '../apis/habit.api';

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
}
