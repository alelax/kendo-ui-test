import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiResponse, Product } from '../product.model';
import { GridRepository } from './grid.repository';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

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

}
