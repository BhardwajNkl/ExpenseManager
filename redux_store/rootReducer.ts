// rootReducer.js
import { combineReducers } from 'redux';
import { budgetEntryReducer } from './slice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    budgetEntrySlice: budgetEntryReducer,
});

export default rootReducer;
