import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { GridService, GridView } from '../../services/grid.service';
import {
  ColumnComponent,
  GridComponent,
  KENDO_GRID,
  MultipleSortSettings,
  PagerSettings
} from '@progress/kendo-angular-grid';
import { MULTIPLE_SORTING_SETTINGS, PAGINATION_SETTINGS } from '../../grid.settings';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_LABELS } from '@progress/kendo-angular-label';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@progress/kendo-angular-buttons';
import { RouterLink } from '@angular/router';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { ColumnSetting, GRID_COLUMN_OPERATIONS_DEF } from '../grid-column-operations/grid-column.def';

@Component({
  selector: 'app-grid-multi-view-state',
  imports: [KENDO_GRID, KENDO_DROPDOWNS, KENDO_INPUTS, KENDO_LABELS, ReactiveFormsModule, ButtonComponent, RouterLink ],
  templateUrl: './grid-multi-view-state.component.html',
  styleUrl: './grid-multi-view-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GridMultiViewStateComponent implements OnInit {
  protected readonly gridService = inject(GridService);
  protected readonly pagerSettings = signal<PagerSettings>(PAGINATION_SETTINGS);
  protected readonly sorterSettings = signal<MultipleSortSettings>(MULTIPLE_SORTING_SETTINGS)
  protected readonly columnDefs = computed<ColumnSetting[]>(() => {
    const activeView = this.gridService.activeView();
    console.log('activeView: ', activeView)
    if (activeView) return activeView.gridState.columnsState;
    return GRID_COLUMN_OPERATIONS_DEF;
  })

  form: FormGroup = new FormGroup({
    viewName: new FormControl("", [Validators.required]),
    isDefault: new FormControl(false),
    views: new FormControl({ text: "Seleziona una vista", value: undefined, isDefault: true }),
  });

  viewsList = this.gridService.gridViewsList;

  constructor() {
    effect(() => {
      const viewList = this.viewsList();
      const defaultItem = viewList.find(v => v.isDefault);
      if (defaultItem) {
        this.form.get('views')?.setValue(defaultItem);
        this.form.get('viewName')?.setValue(defaultItem.text);
        this.form.get('isDefault')?.setValue(defaultItem.isDefault);
      }
    });
  }

  ngOnInit() {
    this.gridService.resetDataState();
    this.gridService.initGridViews();
    this.fetchData();
    this.listenFormChange();
  }

  fetchData() {
    this.gridService.loadData(this.gridService.state().gridState, 'local');
  }

  protected saveNewView(grid: GridComponent) {
    const columns = grid.columns.toArray() as ColumnComponent[];
    const columnsConfig = columns.map((item) => {
      return <ColumnSetting> {
        field: item.field,
        width: item.width,
        _width: item['_width'],
        title: item.title,
        filter: item.filter,
        format: item.format,
        filterable: item.filterable,
        orderIndex: item.orderIndex,
        hidden: item.hidden
      };
    })
    const viewState: GridView = {
      viewName: this.form.get('viewName')?.value,
      isDefault: this.form.get('isDefault')?.value || false,
      viewId: this.form.get('views')?.value && this.form.get('views')?.value.value ? this.form.get('views')?.value.value : 0,
      gridState: {
        columnsState: columnsConfig,
        dataState: this.gridService.state().gridState,
      }
    }
    this.gridService.updateGridViews(viewState);
    console.log('viewState: ', viewState)
  }

  protected deleteView() {
    const viewListSelected = this.form.get('views')?.value
    if (viewListSelected && viewListSelected.value) this.gridService.deleteGridView(viewListSelected.value);
  }

  protected resetForm() {
    this.form.reset(null, { emitEvent: false })
  }

  private listenFormChange() {
    this.form.get('views')?.valueChanges.subscribe( selectedView => {
      if (!selectedView || (selectedView && !selectedView.value)) this.resetForm();
      else {
        this.form.get('viewName')?.setValue(selectedView.text);
        this.form.get('isDefault')?.setValue(selectedView.isDefault);
        this.gridService.setActiveView(selectedView.value);
      }
    })
  }
}
