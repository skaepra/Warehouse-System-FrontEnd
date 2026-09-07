import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductUiState {
  visbil: boolean;
  show: { id?: string };
  color: string;
  imagenumper: number;
}

// 2. الحالة الابتدائية (Initial State)
const initialState: ProductUiState = {
  visbil: false,
  show: {},
  color: "",
  imagenumper: 0,
};

 const productUiSlice = createSlice({
  name: "productUi",
  initialState,
  reducers: {
    hand: (state, action: PayloadAction<string>) => {
      if (!state.visbil) {
        state.show = { id: action.payload };
        state.visbil = true;
      } else {
        state.visbil = false;
        state.imagenumper = 0;
        state.color = "";
      }
    },
  },
});

export const { hand } = productUiSlice.actions;
export default productUiSlice.reducer;
