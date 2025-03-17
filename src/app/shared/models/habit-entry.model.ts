import {HabitEntryResponse} from '../interfaces/habit-entries.interfaces';

export class HabitEntry {
  id: string;
  startTime: Date;
  endTime: Date;
  note: string;
  habit: {id: string, name: string};

  constructor({ id, startTime, endTime, note, habit }: HabitEntryResponse) {
    this.id = id;
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
    this.note = note;
    this.habit = habit;
  }
}
