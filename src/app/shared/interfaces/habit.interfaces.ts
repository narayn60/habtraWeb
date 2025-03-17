import {Frequency} from '../../features/habits/types/types';
import {HabitEntryResponse} from './habit-entries.interfaces';

export interface HabitResponse {
  id: string;
  name: string;
  frequency: Frequency;
  target: number;
  entries: HabitEntryResponse[];
}

export interface HabitCreationRequest {
  habit: string;
  frequency: Frequency;
  target: number;
}
