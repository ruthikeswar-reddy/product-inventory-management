import React from 'react';
import{
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    IconButton,
    ListItemButton
} from '@mui/material';


import{
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from '@mui/icons-material';

import { useEffect, useState } from 'react';

import {useLocation, useNavigate} from 'react-router-dom';
import profileImage from 'assets/profile.JPG';
import FlexBetween from './FlexBetween';

const navItems =[
    {
        text:'Dashboard',
        icon: <HomeOutlined/>
    },
    {
        text:'Client Facing',
        icon:null
    },
    {
        text:'Products',
        icon: <ShoppingCartOutlined/>
    },
    {
        text:'Customers',
        icon: <Groups2Outlined/>
    },
    {
        text:'Transactions',
        icon: <ReceiptLongOutlined/>
    },
    {
        text:'Geography',
        icon: <PublicOutlined/>
    },
    {
        text:'Sales',
        icon:null
    },
    {
        text:'Overview',
        icon: <PointOfSaleOutlined/>
    },
    {
        text:'Daily',
        icon: <TodayOutlined/>
    },
    {
        text:'Monthly',
        icon: <CalendarMonthOutlined/>
    },
    {
        text:'Breakdown',
        icon: <PieChartOutlined/>
    },
    {
        text:'Management',
        icon:null
    },
    {
        text:'Admin',
        icon: <AdminPanelSettingsOutlined/>
    },
    {
        text:'Performance',
        icon: <TrendingUpOutlined/>
    },

]

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const [active, setActive] = useState('');
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(()=>{
        setActive(pathname.substring(1))
    },[pathname]);
  return <Box component = 'nav' >
    {/* if only side bar is open then we execute drawer component */}
    {isSidebarOpen && 
    <Drawer
        open={isSidebarOpen}
        close={()=>{setIsSidebarOpen(false)}}
        variant='permanent'
        anchor='left'

        sx={{
            width:drawerWidth,
            '& .css-15b8vjn-MuiPaper-root-MuiDrawer-paper':{
                color:theme.palette.secondary[200],
                backgroundColor:theme.palette.background.alt,
                boxSizing:'border-box',
                borderWidth:isNonMobile?0:'2px',
                width:drawerWidth
            },

            '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper':{
                color:theme.palette.secondary[200],
                backgroundColor:theme.palette.background.alt,
                boxSizing:'border-box',
                borderWidth:isNonMobile?0:'2px',
                width:drawerWidth
            }
        }}

    >

        <Box width="100%">

            {/* This box is for left top right to show PROJECT NAME and a < icon to close side bar if it is mobile */}
            <Box m="1.5rem 2rem 1rem 3rem">{/* top space, right space , bottom space, left space */}
                <FlexBetween color={theme.palette.secondary.main}>

                    <Box display="flex" alignItems="center" gap="0.5rem" >
                        <Typography variant='h6' fontWeight="bold">
                            Product Inventory Management
                        </Typography>
                    </Box>

                    {
                        !isNonMobile && (
                            <IconButton onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}}>
                                <ChevronLeft/>
                            </IconButton>
                        )
                    }

                </FlexBetween>

            </Box>

            <List>
                {navItems.map(({text, icon})=>{
                    if(!icon){
                        return(
                            <Typography key={text} sx={{m:"1rem 0 0 2rem"}}>
                                {text}
                            </Typography>
                        )
                    }
                    const lcText = text.toLowerCase();
                    return(
                        <ListItem key={text} disablePadding sx={{m:'0 0 0 0'}}>
                            <ListItemButton 
                                onClick={()=>
                                    {
                                        navigate(`/${lcText}`);
                                        setActive(lcText);
                                    }}
                                sx={{
                                    backgroundColor:
                                            active === lcText
                                            ?theme.palette.secondary[300]
                                            :"transparent",
                                    color:
                                        active===lcText
                                        ?theme.palette.primary[600]
                                        :theme.palette.secondary[100],
                                    m:'0 0 0 0'

                                }}
                            >

                                <ListItemIcon
                                    sx={{
                                        ml:"2rem",
                                        color:
                                            active===lcText
                                            ? theme.palette.primary[600]
                                            : theme.palette.secondary[200],
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>


                                <ListItemText primary={text}/>
                                { active===lcText &&(
                                    <ChevronRightOutlined sx={{ml:"auo"}}/>
                                )
                                }

                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>

            <Divider/>
            <FlexBetween textTransform='none'gap='1rem' m='2rem 2rem 1rem 3rem'>
                <Box
                    component="img"
                    alt="profileImg"
                    src={profileImage}
                    borderRadius="50%"
                    height="40px"
                    width="40px"
                />

                <Box textAlign="left">
                    <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                    >
                        {user.name}
                    </Typography>
                    <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                    >
                        {user.occupation}
                    </Typography>
                </Box>
                <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
                />


            </FlexBetween>


        </Box>

    </Drawer>
    }

  </Box>
}

export default Sidebar