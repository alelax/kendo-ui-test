import { Component } from '@angular/core';
import { KENDO_DATEINPUTS } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-calendar',
  imports: [
    KENDO_DATEINPUTS
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export default class CalendarComponent {

}
