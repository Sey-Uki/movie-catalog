import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IMovie {
  id: number;
  name: string;
  description: string;
  src: string;
}

type MovieState = {
  cards: IMovie[];
};

const initialState: MovieState = {
  cards: [],
};

export const getCards = createAsyncThunk<IMovie[]>(
  "cards/getCards",
  async () => {
    const response = await fetch(
      "https://run.mocky.io/v3/f41356c2-e1ee-4fe3-aad7-62e2c5bb68a4"
    );
    return (await response.json()).data;
  }
);

export const cards = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
  },
});

export const cardsReducer = cards.reducer;
