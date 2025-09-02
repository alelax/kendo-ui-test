import { Component, inject, input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult, KENDO_GRID, PageChangeEvent } from '@progress/kendo-angular-grid';
import { MasterDetailService } from '../services/master-detail.service';
import { CommonModule } from '@angular/common';

export interface Category {
  CategoryID: number;
  CategoryName: string;
  Discription: string;
  Picture: string;
}

@Component({
  selector: 'app-detail-grid',
  imports: [KENDO_GRID, CommonModule],
  templateUrl: './detail-grid.component.html',
  styleUrl: './detail-grid.component.scss',
  providers: [MasterDetailService]
})
export class DetailGridComponent implements OnInit {

  private service = inject(MasterDetailService);

  category = input<Category>();
  public view!: Observable<GridDataResult>;
  public isLoading!: boolean;
  public skip = 0;

  public ngOnInit(): void {
    this.view = this.service;
    this.isLoading = this.service.loading;
    /*load products for the given category*/
    const category = this.category();
    if (category) {
      this.service.queryForCategory(category.CategoryID, {
        skip: this.skip,
        take: 5,
      });
    }
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    const category = this.category();
    if (category) {
      this.service.queryForCategory(category.CategoryID,  { skip, take });
    }
  }

}
