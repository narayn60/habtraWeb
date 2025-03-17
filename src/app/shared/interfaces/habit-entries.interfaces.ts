export interface HabitEntryResponse {
  id: string;
  startTime: Date;
  endTime: Date;
  note: string;
  habit: {id: string; name: string};
}

export interface HabitEntryCreationRequest {
  habitId: string;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
}
