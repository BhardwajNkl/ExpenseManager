import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

import { BudgetEntryInterface } from '../screens/BudgetEntryList';

const initialState: { data: BudgetEntryInterface[], status: string, error: any } = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchData = createAsyncThunk('budgetEntrySlice/fetchData',
async ():Promise<BudgetEntryInterface[]> => {
    try {
        // const data = await someApiCall;
        console.log("haha")
        const data = [{
            itemName: 'string',
            plannedBudget: 'string',
            actualBudget: 'string'
        }];
        return data;
    } catch (error) {
        return [];
    }
})

const budgetEntrySlice = createSlice({
    name: "budgetEntrySlice",
    initialState,
    reducers: {
        // updating the current state itself is allowed: payload>{payload, type}
        addEntry(state, action: { payload: BudgetEntryInterface, type: string }) {
            state.data.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchData.pending,(state, action)=>{
            state.status = 'loading';
        })
        builder.addCase(fetchData.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            state.data = state.data.concat(action.payload);
        })
        builder.addCase(fetchData.rejected,(state, action)=>{
            state.status='failed';
            state.error='some error';
        })
        
    },
});

export const actions = budgetEntrySlice.actions;
export const budgetEntryReducer = budgetEntrySlice.reducer;