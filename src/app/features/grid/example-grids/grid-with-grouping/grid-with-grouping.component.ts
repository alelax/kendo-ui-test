import { Component, inject, OnInit, signal } from '@angular/core';
import { GridService } from '../../services/grid.service';
import { KENDO_GRID, MultipleSortSettings, PagerSettings } from '@progress/kendo-angular-grid';
import { MULTIPLE_SORTING_SETTINGS, PAGINATION_SETTINGS } from '../../grid.settings';

@Component({
  selector: 'app-grid-with-grouping',
  imports: [KENDO_GRID],
  templateUrl: './grid-with-grouping.component.html',
  styleUrl: './grid-with-grouping.component.scss'
})
export default class GridWithGroupingComponent implements OnInit {

  protected readonly gridService = inject(GridService);
  protected readonly pagerSettings = signal<PagerSettings>(PAGINATION_SETTINGS);
  protected readonly sorterSettings = signal<MultipleSortSettings>(MULTIPLE_SORTING_SETTINGS)

  ngOnInit() {
    this.gridService.resetDataState();
    this.fetchData();
  }

  fetchData() {
    this.gridService.loadData(this.gridService.state().gridState, 'local');
  }
}
