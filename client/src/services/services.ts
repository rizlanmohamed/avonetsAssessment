import axios, { AxiosResponse } from "axios";

export type Expense = {
  _id: any;
  expense: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  note?: string;
};

export type ExpensesArray = {
  data: Expense[];
};

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "X-Custom-Header": "foobar" },
});

const getExpensesService = (): Promise<AxiosResponse<Expense[]>> => {
  return api.get("/api/Expense/GetAll");
};

const deleteExpenseService = (
  id: string
): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/Expense/Delete/${id}`);
};

const createExpenseService = (
  data: Expense
): Promise<AxiosResponse<Expense>> => {
  return api.post("/api/Expense/Create", data);
};

const updateExpenseService = (
  data: Expense
): Promise<AxiosResponse<void>> => {
  return api.put("/api/Expense/Update", data);
};

const searchExpenseService = (
  keyword: String | null
): Promise<AxiosResponse<any>> => {
  return api.get("/api/Expense/Search", { params: {query: keyword } });
};

const pieChartService = (): Promise<AxiosResponse<any>> => {
  return api.get("/api/Visualization/PieChart");
};

const balanceSummaryService = (): Promise<AxiosResponse<any>> => {
  return api.get("/api/Visualization/BalanceSummary");
};


export {
  getExpensesService,
  deleteExpenseService,
  createExpenseService,
  updateExpenseService,
  searchExpenseService,
  pieChartService,
  balanceSummaryService,
};
