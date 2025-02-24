import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-card',
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
    ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() header: string = '';
}
