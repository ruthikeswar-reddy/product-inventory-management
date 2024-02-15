import React, {useState} from 'react';
import {
     LightModeOutlined,
     DarkModeOutlined,
     Menu as MenuIcon,
     Search,
     SettingsOutlined,
     ArrowDropDownOutlined,
 } from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import {setMode} from 'state'; // its the reducer we have defined in state/index.js file in createSlice().
import profileImage from 'assets/profile.JPG';
import { useTheme } from '@emotion/react';
import { AppBar, IconButton, Button, Menu, Typography, Box, Toolbar, InputBase, MenuItem } from '@mui/material';



const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    // to setup the dropdown menu we need some variables
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event)=>setAnchorEl(event);
    const handleClose = ()=>setAnchorEl(null);
  return <AppBar
    sx={{
        position:"static",
        background:'none',
        boxShadow:'none',
        
    }}
  
  >
    <Toolbar sx={{justifyContent:'space-between'}}>
        {/* left side */}
        <FlexBetween>
            <IconButton onClick={()=>{
                setIsSidebarOpen(!isSidebarOpen);
                console.log(isSidebarOpen);
            }}>
                <MenuIcon/>
            </IconButton>
            <FlexBetween
                backgroundColor = {theme.palette.background.alt} //useTheme acquires the theme object of current component theme provider, as we have provided theme in app.js for all components at begining.
                borderRadius="9px"
                gap = '3rem'
                p='0.1rem 1.5rem'
            >
                <InputBase placeholder = 'Search....' />
                <IconButton>
                    <Search />
                </IconButton>

            </FlexBetween>
        </FlexBetween>

        {/** RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
            <IconButton onClick={()=>{dispatch(setMode())}}>
                {theme.palette.mode === 'dark'?(<DarkModeOutlined sx={{fontSize:'25px'}}/>):(<LightModeOutlined sx={{fontSize:'25px'}}/>)}

            </IconButton>
            <IconButton>
                <SettingsOutlined sx={{ fontSize:'25px'}}/>
            </IconButton>

            <FlexBetween>
                <Button
                    onClick = {handleClick}
                    sx={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        textTransform:"none",
                        gap:"1rem" }}
                >
                    <Box
                        component="img"
                        alt="profileImg"
                        src={profileImage}
                        borderRadius="50%"
                        height="32px"
                        width="32px"
                    />

                    <Box textAlign="left">
                        <Typography
                            fontWeight="bold"
                            fontSize="0.85rem"
                            sx={{ color: theme.palette.secondary[100] }}
                        >
                            {user.name}
                        </Typography>
                        <Typography
                            fontSize="0.75rem"
                            sx={{ color: theme.palette.secondary[200] }}
                        >
                            {user.occupation}
                        </Typography>
                    </Box>

                    <ArrowDropDownOutlined
                        sx={{color:theme.palette.secondary[300], fontSize:'25px'}}
                    />

                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal:"center", }}>
                    <MenuItem onClick={handleClose}> Log Out</MenuItem>
                </Menu>
            </FlexBetween>

        </FlexBetween>


    </Toolbar>

  </AppBar>
}

export default Navbar