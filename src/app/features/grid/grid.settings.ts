import { MultipleSortSettings, PagerSettings } from '@progress/kendo-angular-grid';

export const PAGINATION_SETTINGS: PagerSettings = {
  buttonCount: 5,
  info: true,
  pageSizes: [2, 5, 10, 20],
  previousNext: true,
  type: 'numeric',
  responsive: true,
  position: 'bottom'
}

export const MULTIPLE_SORTING_SETTINGS: MultipleSortSettings = {
  allowUnsort: true,
  initialDirection: 'asc',
  mode: 'multiple',
  multiSortKey: 'ctrl', // command on MacOs
  showIndexes: true,
}
