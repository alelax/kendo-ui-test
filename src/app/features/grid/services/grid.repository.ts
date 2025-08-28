import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponse, Product } from '../product.model';
import { State } from '@progress/kendo-data-query';
import { PRODUCTS } from '../grid.local-data';

const BASE_URL = 'https://dummyjson.com/products';

@Injectable({
  providedIn: 'root'
})
export class GridRepository {
  private readonly http = inject(HttpClient);

  getAllProducts(gridState: State): Observable<ApiResponse<Product>> {
    const { skip = 0, take = 10, sort } = gridState;

    let sortParams = '';
    if (sort && sort.length > 0) {
      sortParams = `sortBy=${sort[0].field}&order=${sort[0].dir}`;
      sortParams = `&${sortParams}`;
    }

    return this.http.get<ApiResponse<Product>>(`${BASE_URL}?limit=${take}&skip=${skip}${sortParams}`)
  }

  getAllLocalProducts(gridState: State): Observable<ApiResponse<Product>> {
    const { skip = 0, take = 10 } = gridState;
    return of(PRODUCTS).pipe(
      map(res => ({ ...res, skip, limit: take }))
    );
  }
}
