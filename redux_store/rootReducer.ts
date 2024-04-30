import { combineReducers } from 'redux';

import { budgetEntryReducer } from './slice';

const rootReducer = combineReducers({
    budgetEntrySlice: budgetEntryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
