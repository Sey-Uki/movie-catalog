import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const URL = "https://run.mocky.io/v3/f41356c2-e1ee-4fe3-aad7-62e2c5bb68a4";

export type RateItem = {
  filmscript: number;
  acting: number;
  operator: number;
  average: number;
}

export type MovieItem = {
  id: number;
  name: string;
  description: string;
  src: string;
  like: boolean;
  rates: RateItem;
}

type MovieState = {
  list: MovieItem[];
};

const initialState: MovieState = {
  list: JSON.parse(localStorage.getItem("dataMovies")!) || [],
};

export const getCards = createAsyncThunk<MovieItem[]>(
  "cards/getCards",
  async () => {
    const response = await fetch(URL);
    return (await response.json()).data;
  }
);

export const cards = createSlice({
  name: "cards",
  initialState,
  reducers: {
    likeMovie: (state, action) => {
      const id = action.payload;
      state.list = [...state.list].map((card) => {
        if (card.id === id) {
          return {
            ...card,
            like: !card.like,
          };
        }
        return card;
      });

      localStorage.setItem("dataMovies", JSON.stringify(state.list));
    },

    rateMovie: (state, { payload }: PayloadAction<MovieItem>) => {
      const { id, rates } = payload;
      const { filmscript, operator, acting } = rates;

      state.list = [...state.list].map((card) => {
        if (card.id === id) {
          return {
            ...card,
            rates: {
              ...rates,
              average: (filmscript + operator + acting) / 3,
            },
          };
        }
        return card;
      });

      localStorage.setItem("dataMovies", JSON.stringify(state.list));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      const copyCards = [
        ...action.payload.map((item) => {
          item.like = false;
          item.rates = {
            filmscript: 0,
            acting: 0,
            operator: 0,
            average: 0,
          };
          return item;
        }),
      ];
      state.list = copyCards;
    });
  },
});

export const { likeMovie, rateMovie } = cards.actions;

export const selectMovies = (state: RootState) => state.cards.list;
export const selectFavoritesMovies = (state: RootState) =>
  state.cards.list.filter((movie) => movie.like);

export const selectRatedMovies = (state: RootState) =>
  state.cards.list.filter((movie) => movie.rates.average > 0);

export const cardsReducer = cards.reducer;
