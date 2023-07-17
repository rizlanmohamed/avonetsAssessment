import { combineReducers } from 'redux';
import expensesReducer from './expensesSlice/expensesSlice';

export const rootReducer = combineReducers({
  expenses: expensesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
