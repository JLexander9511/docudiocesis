import { Box, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { LoginForm } from "./components/LoginForm";

export default function Login() {

  return (
    <Grid2 container justifyContent='center' direction='row' sx={{height: '100vh', width: '100vw'}}>

      <Grid2 container direction='column' justifyContent='center' alignItems='center' sx={{bgcolor: '#60abf0', width: '42%'}}>
       <LoginForm/> 
      </Grid2>
      <Box className='divider' sx={{width: '8%'}}>

      </Box>

      <Grid2 container sx={{width: '50%'}} direction='column' justifyContent='center' alignItems='center'>
        <Typography fontFamily='puritan' variant="h1" fontSize={45}>Documentacion parroquial</Typography>
        <Image
        src="https://res.cloudinary.com/dpjk1eyh0/image/upload/v1728493555/q_auto:low/vecteezy_a-pile-of-old-books-on-a-transparent-background-with-copy_24297651_tf5sev.png"
        width={200}
        height={200}
        alt="Picture of the author"/>
        <Stack justifyContent='center' alignItems='center'>
          <Typography fontFamily='puritan' variant="h2" fontSize={28}>Practica libreria de registros parroquiales</Typography>
          <Typography fontFamily='puritan' variant="h3" fontSize={24} mt={3} fontWeight='bold'>Bautizos</Typography>
          <Typography fontFamily='puritan' variant="h3" fontSize={24} fontWeight='bold'>Confirmaciones</Typography>
          <Typography fontFamily='puritan' variant="h3" fontSize={24} fontWeight='bold'>Comuniones</Typography>
          <Typography fontFamily='puritan' variant="h3" fontSize={24} fontWeight='bold'>Matrimonios</Typography>
          <Typography fontFamily='puritan' variant="h3" fontSize={24} fontWeight='bold'>Difuntos</Typography>
        </Stack>
      </Grid2>
   </Grid2>
  )
}
