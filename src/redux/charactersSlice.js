import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const char_limit = 12;
export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page) => {
    const res = await axios(
      `https://breakingbadapi.com/api/characters?limit=${char_limit}&offset=${
        page * char_limit
      }`
    );
    return res.data;
  }
);
export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    status: 'idle',
    page: 0,
    haspage: true,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = 'succeeded';
      state.page += 1;
      if(action.payload.length<12){
        state.haspage=false
      }
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default charactersSlice.reducer;
