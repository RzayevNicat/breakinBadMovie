import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import axios from 'axios'

export const fetchAllQuotes = createAsyncThunk('quotes/fetchAll',async ()=>{
    const res = await axios(`https://breakingbadapi.com/api/quotes`);
    return res.data;
})
export const quotesSlice = createSlice({
    name: 'quotes',
    initialState:{
        items: [],
        status:'idle',

    },
    reducers:{},
    extraReducers:{

        [fetchAllQuotes.fulfilled]:(state,action)=>{
            state.items=action.payload;
            state.status='succeeded';
        },
        [fetchAllQuotes.pending]:(state,action)=>{
            state.status='loading';
        },
        [fetchAllQuotes.rejected]:(state,action)=>{
            state.status='failed';
            state.error = action.error.message
        },
    },

});
export const quotesSelector = (state) => state.quotes.items;
export const statusSelector = (state) => state.quotes.status;
export const errorSelector = (state) => state.quotes.error
export default quotesSlice.reducer;