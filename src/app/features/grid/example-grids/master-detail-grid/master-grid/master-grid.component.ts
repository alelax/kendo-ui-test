import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult, KENDO_GRID, SelectionEvent } from '@progress/kendo-angular-grid';
import { CategoriesService } from '../services/master-detail.service';
import { AsyncPipe, JsonPipe, CommonModule } from '@angular/common';
import { DetailGridComponent } from '../detail-grid/detail-grid.component';

@Component({
  selector: 'app-master-grid',
  imports: [
    KENDO_GRID,
    AsyncPipe,
    DetailGridComponent
  ],
  templateUrl: './master-grid.component.html',
  styleUrl: './master-grid.component.scss',
  providers: [CategoriesService]
})
export class MasterGridComponent implements OnInit {
  private service = inject(CategoriesService);
  public gridData!: Observable<GridDataResult>;
  public isLoading: boolean = false;

  public ngOnInit(): void {
    // Bind the Grid data directly to the service as it is a BehaviorSubject of type GridDataResult.
    this.gridData = this.service;
    this.isLoading = this.service.loading;

    this.loadData();
  }

  private loadData(): void {
    this.service.query({
      skip: 0,
      take: 8,
    });
  }
}
