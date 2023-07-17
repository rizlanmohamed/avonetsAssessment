import {
  getExpensesService,
  deleteExpenseService,
  createExpenseService,
  updateExpenseService,
  searchExpenseService,
} from "../../services/services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Expense, ExpensesArray } from "../../services/services";

export const getExpenses = createAsyncThunk("Expenses/GetAll", async () => {
  const response = await getExpensesService();
  return response.data;
});

export const createExpense = createAsyncThunk(
  "Expenses/Create",
  async (data: Expense) => {
    const res = await createExpenseService(data);
    return res.data; // Return the updated expense data
  }
);

export const deleteExpense = createAsyncThunk(
  "Expenses/Delete",
  async (id: string) => {
    await deleteExpenseService(id);
    return id;
  }
);

export const updateExpense = createAsyncThunk(
  "Expenses/Update",
  async (data: Expense) => {
    await updateExpenseService(data);
    return data; // Return the updated expense data
  }
);

export const searchExpense = createAsyncThunk(
  "Expenses/Search",
  async (keyword: String | null) => {
    const res = await searchExpenseService(keyword);
    return res.data; // Return the updated expense data
  }
);

type ExpensesState = {
  data: Expense[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: ExpensesState = {
  data: [],
  loading: true,
  error: null,
  status: "idle",
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //----------------- All Expenses ----------------------------------
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch expenses.";
      })
      //----------------- Create Expense ----------------------------------
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        console.log("action.payload", action.payload)
        state.loading = false;
        state.data = state.data.concat(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create expense.";
      })
      //----------------- Delete Expense ----------------------------------
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = state.data.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete expense.";
      })
      //----------------- Update Expense  ----------------------------------
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";

        const updateData = state.data.findIndex(
          (item) => item._id === action.payload._id
        );

        if (updateData !== -1) {
          state.data[updateData] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update expense.";
      })
        //----------------- Search Expense ----------------------------------
        .addCase(searchExpense.pending, (state) => {
          state.loading = true;
        })
        .addCase(searchExpense.fulfilled, (state, action) => {
          state.loading = false;
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(searchExpense.rejected, (state, action) => {
          state.loading = false;
          state.data = [];
          state.error = action.error.message ?? "Failed to delete expense.";
        })
      
  },
});

export default expensesSlice.reducer;
