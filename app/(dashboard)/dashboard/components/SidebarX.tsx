'use client';

import { selector } from "@/store/app"
import { AppDispatch } from "@/store/RootState";
import { Box, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import Image from "next/image"
import { useDispatch } from "react-redux"

export const SidebarX = () => {

  const dispatch = useDispatch<AppDispatch>()

  const handleSelector = (selection:string) => {
    dispatch(selector(selection))
  }
  return (
    <Grid2 container 
        sx={{
            bgcolor: '#1976d2',
            position: 'absolute',
            width: '65px',
            height: 'calc(100vh - 70px)',
            transition: 'width 0.3s', // Transición suave
            '&:hover': {
                width: 230, // Ancho al hacer hover
            },
            overflow: 'hidden',
            zIndex: 10
        }}>
        <List sx={{width: '100%'}}>
        <ListItem disablePadding >
            <ListItemButton onClick={() => handleSelector('bautismo')}>
              <ListItemIcon sx={{marginLeft: '-7px', marginRight: '10px'}}>
                <Image
                    src="https://res.cloudinary.com/dpjk1eyh0/image/upload/v1728702514/Bautism_icon_clfmgo.png"
                    width={50}
                    height={50}
                    alt="bautism icon"/>
              </ListItemIcon>
              <Typography fontWeight='normal' variant="h5" color="white">Bautizo</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelector('comunion')}>
              <ListItemIcon sx={{marginLeft: '-7px', marginRight: '10px'}}>
                <Image
                    src="https://res.cloudinary.com/dpjk1eyh0/image/upload/v1728702884/PC_icon_gkh8qc.png"
                    width={50}
                    height={50} 
                    alt="communion icon"/>
              </ListItemIcon>
              <Typography fontWeight='normal' variant="h5" color="white">Comunion</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelector('confirmacion')}>
              <ListItemIcon sx={{marginLeft: '-7px', marginRight: '10px'}}>
                <Image
                    src="https://res.cloudinary.com/dpjk1eyh0/image/upload/v1728703108/conf_icon_yfhjtv.png"
                    width={50}
                    height={50}
                    alt="confirmation icon"/>
              </ListItemIcon>
              <Typography fontWeight='normal' variant="h5" color="white">Confirmacion</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelector('matrimonio')}>
              <ListItemIcon sx={{marginLeft: '-7px', marginRight: '10px'}}>
                <Image
                    src="https://res.cloudinary.com/dpjk1eyh0/image/upload/v1728703263/wed_icon_s0ok9n.png"
                    width={50}
                    height={50}
                    alt="wedding icon"/>
              </ListItemIcon>
              <Typography fontWeight='normal' variant="h5" color="white">Matrimonio</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelector('difuntos')}>
              <ListItemIcon sx={{marginLeft: '-7px', marginRight: '10px'}}>
                <Image
                    src="https://res.cloudinary.com/dpjk1eyh0/image/upload/v1728703427/def_icon_cpewdi.png"
                    width={50}
                    height={50}
                    alt="defuncts icon"/>
              </ListItemIcon>
              <Typography fontWeight='normal' variant="h5" color="white">Difuntos</Typography>
            </ListItemButton>
          </ListItem>
        </List>
    </Grid2>
  )
}
