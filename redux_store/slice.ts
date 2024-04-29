import {createSlice, configureStore} from '@reduxjs/toolkit';

import { BudgetEntryInterface } from '../screens/BudgetEntryList';

const data:BudgetEntryInterface[] = [];

const initialState = data;

const budgetEntrySlice = createSlice({
    name:"budgetEntrySlice",
    initialState,
    reducers:{
        // updating the current state itself is allowed: payload>{payload, type}
        addEntry(state, action){
            state.push(action.payload.entryData);
        }
    }
});

export const actions = budgetEntrySlice.actions;
export const budgetEntryReducer = budgetEntrySlice.reducer;