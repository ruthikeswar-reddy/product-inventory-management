import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useSelector} from "react-redux";
import React, { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard  from "scenes/dashboard";
import Layout from "scenes/layout";
import Products from 'scenes/products';
import Customers from 'scenes/customers';
import Transactions from 'scenes/transactions';
import Geography from 'scenes/geogrpahy';
import Overview from 'scenes/overview';
import Daily from "scenes/daily";
import Monthly from 'scenes/monthly';
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";

function App() {
  const mode = useSelector((state)=>state.global.mode);
  // global is given as name:global in createSlice() parameters and in configureStore() reducers parameter global:globalReducer
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  // useMemo() is used to memorize the extensive computation values, it recomputes when props data(parameter data changes)
  // createTheme() is used to create a user custom theme with various properties like pallete, primary, secondary, typography.
  // createTheme() returns a themeObject which is passed to ThemeProvider() which applies the theme for entire application.

  return(
  <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/*ThemeProvider in Material-UI is a higher-order component that provides a theme to all components in your React application */}
          {/*The CssBaseline ensures that any default styles applied by browsers are reset or normalized, providing a consistent starting point for the custom styles applied by Material-UI components.
              Without CssBaseline, you might encounter variations in default styles across different browsers, and using it helps to ensure a more predictable and consistent visual appearance for your application
          */}
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              {/*the layout contains navbar and side bar as it is required for every page we navigate from starting page to any page */}
              <Route path = '/' element={<Navigate to='/dashboard' replace/>} />
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path ='/products' element={<Products/>}/>
              <Route path='/customers' element={<Customers />} />
              <Route path='/transactions' element = {<Transactions/>} />
              <Route path = '/geography' element={<Geography/>} />
              <Route path = '/overview' element={<Overview/>} />
              <Route path='/daily' element = {<Daily/>}/>
              <Route path = '/monthly' element = {<Monthly/>} />
              <Route path ='/breakdown' element = {<Breakdown/>} />
              <Route path = '/admin' element={<Admin/>} />
              <Route path = '/performance' element = {<Performance/>} />
            </Route>
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );

}

export default App;
