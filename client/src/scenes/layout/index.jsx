import React, {useState} from 'react';
import {Box, useMediaQuery } from "@mui/material";
import { Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { useGetUserQuery } from 'state/api';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');// if it is a mobile screen then the width will be less than 600px then it give false,if it is computer then it will give true
  const [isSidebarOpen, setIsSidebarOpen]=useState(true);// initially the variable isSidebarOpen will be true, we use setIsSidebarOpen to change its value based on our conditions.
  //getting userId from state variable
  const userId = useSelector((state)=>state.global.userId);

  //apicall
  const { data }=  useGetUserQuery(userId);
  
  return( 
  <Box display={isNonMobile?'flex':'block'} width="100%" height="100%"> {/*if its a desktop then display: flex, mobile:block */}
    <Sidebar
      user = {data|| {}}
      isNonMobile={isNonMobile}
      drawerWidth='250px'
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
    <Box flexGrow={1}> {/* flexgrow is used to take as much space as possible and available */}
      <Navbar
        user = {data || {}} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet />
    </Box>
  </Box>  
  );
};

export default Layout;