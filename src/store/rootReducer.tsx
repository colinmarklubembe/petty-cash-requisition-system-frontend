import { combineReducers } from "@reduxjs/toolkit";
import requisitionReducer from "../features/requisitions/requisitionSlice";

const rootReducer = combineReducers({
  requisitions: requisitionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
