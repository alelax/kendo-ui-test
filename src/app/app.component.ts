import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { KENDO_DATEINPUTS } from '@progress/kendo-angular-dateinputs';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KENDO_BUTTON, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kendo-ui-test';
}
