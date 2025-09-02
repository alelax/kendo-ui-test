import { computed, inject, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { ApiResponse, Product } from '../product.model';
import { GridRepository } from './grid.repository';
import { GridDataResult, GridState } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { ColumnSetting } from '../example-grids/grid-column-operations/grid-column.def';


export interface GridView {
  viewName: string;
  isDefault: boolean;
  viewId: number;
  gridState: {
    columnsState: ColumnSetting[],
    dataState: State
  };
}

export interface ViewList {
  text: string;
  value: number | undefined,
  isDefault: boolean
}

interface ProductState {
  items: GridDataResult;
  loading: boolean;
  gridState: State
}

export type ResourceType = 'API' | 'local';

const initialState: ProductState = {
  items: { data: [], total: 0 },
  loading: false,
  gridState: {
    skip: 0,
    take: 10,
    group: [],
    filter: { filters: [], logic: "and" },
    sort: [],
  }
};

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private readonly gridRepository = inject(GridRepository);

  state = signal(initialState);

  resetDataState() {
    this.state.set(initialState);
  }

  loadData(gridState: State, resourceType: ResourceType) {

    this.state.update(state => ({
      ...state,
      loading: true
    }));

    const dataLoader = resourceType === 'API'
      ? this.gridRepository.getAllProducts(gridState)
      : this.gridRepository.getAllLocalProducts(gridState);

    dataLoader.subscribe( res => {
      let gridDataResult: GridDataResult = resourceType === 'API'
        ? { data: [...res.products], total: res.total}
        : process(res.products, gridState);

      this.updateGridState(this.state, gridDataResult, res);
    });

  }

  dataStateChange(newState: State, resourceType: ResourceType) {
    console.log('DATA STATE CHANGE: ', newState);
    this.state.update(state => ({
      ...state,
      gridState: {
        ...state.gridState,
        take: newState.take,
        skip: newState.skip,
        sort: newState.sort?.filter( s => s.dir ),
        group: newState.group || [],
        filter: newState.filter || { filters: [], logic: "and" }
      }
    }))

    this.loadData(this.state().gridState, resourceType);
  }

  private updateGridState(
    state: WritableSignal<ProductState>,
    gridDataResult: GridDataResult,
    data: ApiResponse<Product>
  ) {
    state.update(state => ({
      ...state,
      items: gridDataResult,
      loading: false,
      gridState: {
        ...state.gridState,
        take: data.limit === data.total ? 10 : data.limit,
        skip: data.skip,
      }
    }));
  }


  // MULTI VIEWS LOGIC
  gridViews = signal<GridView[]>([]);
  activeViewId = signal<number | undefined>(undefined);
  activeView = computed<GridView | undefined>(() => {
    const activeViewId = this.activeViewId();
    if (!activeViewId) return undefined;
    const views = untracked(this.gridViews);
    return views.find(v => v.viewId === activeViewId);
  });
  gridViewsList = computed<ViewList[]>(() => {
    const defaultItem: ViewList = { text: "Seleziona una vista", value: undefined, isDefault: false };
    const mappedViews = this.gridViews().map(v => ({ text: v.viewName, value: v.viewId, isDefault: v.isDefault }))
    return [...mappedViews, defaultItem];
  })

  initGridViews() {
    const storedViews = localStorage.getItem('grid-views');
    if (storedViews) {
      const parsedViews = JSON.parse(storedViews);
      this.gridViews.set(parsedViews);
    }
  }

  updateGridViews(gridView: GridView) {
    const currentId = gridView.viewId;
    const generateId = `${Date.now()}${Math.random().toString().substring(2, 9)}`;

    const operationId = currentId === 0 ? +generateId : currentId;

    if (currentId === 0)  this.gridViews.update(gridViews => [...gridViews, { ...gridView, viewId: +operationId }]);
    else this.gridViews.update(gridViews => gridViews.map(gv => gv.viewId === operationId ? { ...gridView } : gv));

    if (gridView.isDefault) {
      this.gridViews.update(gridViews => gridViews.map(gv => gv.viewId !== operationId ? { ...gv, isDefault: false } : gv));
    }
    localStorage.setItem('grid-views', JSON.stringify(this.gridViews()));
  }

  deleteGridView(gridViewId: number) {
    this.gridViews.update(gridViews => gridViews.filter(gv => gv.viewId !== gridViewId));
    localStorage.setItem('grid-views', JSON.stringify(this.gridViews()));
  }

  setActiveView(gridViewId: number) {
    this.activeViewId.set(gridViewId);
  }

}
