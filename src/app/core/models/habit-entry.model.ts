import {HabitEntryResponse} from '../apis/habit.api';

export class HabitEntry {
  id: string;
  startTime: Date;
  endTime: Date;
  note: string;

  constructor({ id, startTime, endTime, note }: HabitEntryResponse) {
    this.id = id;
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
    this.note = note;
  }
}
