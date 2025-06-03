export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
}

export interface ICategoryResponse<T> {
  data: T;
  message: string;
  status: string;
}
