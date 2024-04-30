import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

import { BudgetEntryInterface } from '../screens/BudgetEntryList';

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: { data: BudgetEntryInterface[], status: string, error: any } = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchData = createAsyncThunk('budgetEntrySlice/fetchData',
async ():Promise<BudgetEntryInterface[]> => {
    try {
        // const data = await someApiCall;
        // console.log("fetching from asyncstorage")
        // const data = [{
        //     itemName: 'string',
        //     plannedBudget: 'string',
        //     actualBudget: 'string'
        // }];
        // return data;

        const dataString = await AsyncStorage.getItem('reduxState');
        if(dataString!=null){
            const data =  await JSON.parse(dataString);
            console.log(data);
            return data;
        } else{
            return [];
        }

    } catch (error) {
        return [];
    }
});

export const persistData = createAsyncThunk('budgetEntrySlice/persistData',
async (data:BudgetEntryInterface[]) => {
    try {
        // console.log("persisting to asyncstorage");
        // console.log(budgetEntry);
        // return budgetEntry;
        console.log("persisting");
        console.log(data);
        await AsyncStorage.setItem('reduxState',JSON.stringify(data));
        return data;
    } catch (error) {
        // return budgetEntry;
        return null;
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
        builder
        .addCase(fetchData.pending,(state, action)=>{
            state.status = 'loading';
        })
        .addCase(fetchData.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            state.data = state.data.concat(action.payload);
        })
        .addCase(fetchData.rejected,(state, action)=>{
            state.status='failed';
            state.error='some error';
        })
        .addCase(persistData.fulfilled,(state, action)=>{
            console.log("data has been persisted.");
            // update 
            if(action.payload!=null){
                state.data = action.payload;
            }
        })
        
        
    },
});

export const actions = budgetEntrySlice.actions;
export const budgetEntryReducer = budgetEntrySlice.reducer;