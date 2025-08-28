import { Component, inject, OnInit, signal } from '@angular/core';
import { KENDO_GRID, MultipleSortSettings, PagerSettings } from '@progress/kendo-angular-grid';
import { GridService } from '../../services/grid.service';
import { MULTIPLE_SORTING_SETTINGS, PAGINATION_SETTINGS } from '../../grid.settings';

@Component({
  selector: 'app-base-grid',
  imports: [KENDO_GRID],
  templateUrl: './base-grid.component.html',
  styleUrl: './base-grid.component.scss'
})
export default class BaseGridComponent implements OnInit {

  protected readonly gridService = inject(GridService);
  protected readonly pagerSettings = signal<PagerSettings>(PAGINATION_SETTINGS);
  protected readonly sorterSettings = signal<MultipleSortSettings>(MULTIPLE_SORTING_SETTINGS)

  ngOnInit() {
    this.gridService.resetDataState();
    this.fetchData();
  }

  fetchData() {
    this.gridService.loadData(this.gridService.state().gridState, 'API');
  }
}
