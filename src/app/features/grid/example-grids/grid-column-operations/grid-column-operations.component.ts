import { Component, inject, OnInit, signal } from '@angular/core';
import { KENDO_GRID, MultipleSortSettings, PagerSettings } from '@progress/kendo-angular-grid';
import { GridService } from '../../services/grid.service';
import { MULTIPLE_SORTING_SETTINGS, PAGINATION_SETTINGS } from '../../grid.settings';
import { ColumnSetting, GRID_COLUMN_OPERATIONS_DEF } from './grid-column.def';

@Component({
  selector: 'app-grid-column-operations',
  imports: [KENDO_GRID],
  templateUrl: './grid-column-operations.component.html',
  styleUrl: './grid-column-operations.component.scss'
})
export default class GridColumnOperationsComponent implements OnInit {

  protected readonly gridService = inject(GridService);
  protected readonly pagerSettings = signal<PagerSettings>(PAGINATION_SETTINGS);
  protected readonly sorterSettings = signal<MultipleSortSettings>(MULTIPLE_SORTING_SETTINGS)
  protected readonly columnDefs = signal<ColumnSetting[]>(GRID_COLUMN_OPERATIONS_DEF);

  ngOnInit() {
    this.gridService.resetDataState();
    this.fetchData();
  }

  fetchData() {
    this.gridService.loadData(this.gridService.state().gridState, 'local');
  }
}
