import { Component } from '@angular/core';
import {HabitsService} from './habits.service';

@Component({
  selector: 'app-habits',
  imports: [],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {

  constructor(private habitsService: HabitsService) {
  }

  ngOnInit() {
    console.log("Called");
    this.habitsService.getAll();
  }
}
