import { Component } from '@angular/core';
import { MasterGridComponent } from './master-grid/master-grid.component';

@Component({
  selector: 'app-master-detail-grid',
  imports: [
    MasterGridComponent
  ],
  templateUrl: './master-detail-grid.component.html',
  styleUrl: './master-detail-grid.component.scss'
})
export default class MasterDetailGridComponent {

}
