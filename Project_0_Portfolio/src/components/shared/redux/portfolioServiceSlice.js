import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  isMobile:false,
  isNavOpen:false,
  isDarkMode:true,
  jsonData:undefined
};

export const portfolioServiceSlice = createSlice({
  name: 'PORTFOLIO',
  initialState,
  reducers: {
    setIsMobile: (state,action) => {
      state.isMobile =action.payload
    },
    setIsNavOpen: (state,action) => {
      state.isNavOpen=action.payload
    },
    setIsDarkMode:(state,action) => {
      state.isDarkMode=action.payload
    },
    setJsonData:(state,action)=>{
      state.jsonData=action.payload;
    }
  },
});

// Export the actions
export const { setIsMobile, setIsNavOpen, setIsDarkMode,setJsonData } = portfolioServiceSlice.actions;

// Export the reducer to be used in the store
export default portfolioServiceSlice.reducer;