import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequisitionState {
  // Define your requisition state here
}

const initialState: RequisitionState = {
  // Initialize your state
};

const requisitionSlice = createSlice({
  name: "requisitions",
  initialState,
  reducers: {
    // Define your reducers here
  },
});

export const { actions, reducer } = requisitionSlice;
export default reducer;
