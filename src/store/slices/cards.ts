import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRate {
  filmscript: number;
  acting: number;
  operator: number;
  average: number;
}

export interface IMovie {
  id: number;
  name: string;
  description: string;
  src: string;
  like: boolean;
  rates: IRate;
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
  initialState,
  reducers: {
    likeFilm: (state, action) => {
      const id = action.payload;
      state.cards = [...state.cards].map((card) => {
        if (card.id === id) {
          return {
            ...card,
            like: !card.like,
          };
        }
        return card;
      });
    },

    retesFilm: (state, { payload }: PayloadAction<IMovie>) => {
      const { id, rates } = payload;

      const { filmscript, operator, acting } = rates;

      state.cards = [...state.cards].map((card) => {
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
      state.cards = copyCards;
    });
  },
});

export const { likeFilm, retesFilm } = cards.actions;

export const cardsReducer = cards.reducer;
