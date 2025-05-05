'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { Divider, Grid2, Link, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsM from './SettingsM';
import capitalize from '@/utils/capitalize';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/RootState';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { parroquias } from '@/app/(home)/page';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false)

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const {userName, role, parroquia} = useTypedSelector( state => state.app )
  
  const router = useRouter();
  
  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
 
    // Refresh page after updating browser cookies
    router.refresh();
  }

  const handleOpen = () => setOpenModal(true);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
             <Image
                src="https://res.cloudinary.com/dpjk1eyh0/image/upload/v1728493555/q_auto:low/vecteezy_a-pile-of-old-books-on-a-transparent-background-with-copy_24297651_tf5sev.png"
                width={60}
                height={60}
                alt="Picture of the author"/>
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {`Visualizador de registros - ${parroquias[parroquia]}`}
          </Typography>
 
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Grid2 container direction='column' justifyContent='center' alignItems='center'>
                    <AdminPanelSettingsIcon fontSize='large'/>
                    <Typography> { userName } </Typography>
                    <Typography> { capitalize(role) } </Typography>
                </Grid2>
                <Divider />
                  <MenuItem onClick={handleOpen}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" sx={{color: 'black'}}/>
                    </ListItemIcon>
                    <ListItemText>Configuracion</ListItemText>
                  </MenuItem>

                <MenuItem onClick={ handleLogout } sx={{textAlign: 'center'}}><LogoutIcon fontSize="small"/> <ListItemText>Cerrar sesión</ListItemText></MenuItem>
              </Menu>
            </div>
      
        </Toolbar>
      </AppBar>
      {openModal && <SettingsM open={openModal} setOpen={setOpenModal}/>}
    </Box>
  )}