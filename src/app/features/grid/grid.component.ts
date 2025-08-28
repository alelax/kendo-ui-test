import { Component } from '@angular/core';
import { ButtonComponent } from '@progress/kendo-angular-buttons';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-grid',
  imports: [ButtonComponent, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export default class GridComponent {

}
