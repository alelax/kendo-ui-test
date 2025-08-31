export interface ColumnSetting {
  field: string;
  title: string;
  format?: string;
  type: "text" | "numeric" | "boolean" | "date";
  columnContent: "text" | "numeric" | "boolean" | "date" | "image";
  width?: number;
  _width?: number;
  orderIndex?: number;
  filterable?: boolean;
  filter?: any;
  hidden?: boolean;
}

export const GRID_COLUMN_OPERATIONS_DEF: ColumnSetting[] = [
  {
    field: "id",
    title: "ID",
    type: "numeric",
    columnContent: "numeric",
    width: 80
  },
  {
    field: "title",
    title: "Title",
    type: "text",
    columnContent: "text",
    width: 300
  },
  {
    field: "price",
    title: "Price",
    type: "numeric",
    columnContent: "numeric",
    width: 300
  },
  {
    field: "thumbnail",
    title: "Immagine",
    type: "text",
    columnContent: "image",
    width: 200
  },
  {
    field: "description",
    title: "Description",
    type: "text",
    columnContent: "text",
    width: 450
  },
  {
    field: "category",
    title: "Category",
    type: "text",
    columnContent: "text",
    width: 300
  },
  {
    field: "rating",
    title: "Rating",
    type: "numeric",
    columnContent: "numeric",
    format: "# / 5",
    width: 300
  },
  {
    field: "stock",
    title: "In Stock",
    type: "numeric",
    columnContent: "numeric",
    width: 300
  }
]
