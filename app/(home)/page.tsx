"use client";

import { setCookies, setUser } from "@/store/app";
import { AppDispatch, RootState } from "@/store/RootState";
import { Box, Button, CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export let parroquias: Record<string, string> = {
  'milagrosa': 'Ntra. Señora de la Medalla Milagrosa',
  'valle': 'Nuestra Sra. del Valle',
  'coromoto': 'Nuestra Sra. de Coromoto'
}

export let dashLinks: Record<string, string> = {
  'milagrosa': 'dashboard/ml',
  'valle': 'dashboard/vll',
  'coromoto': 'dashboard/cm',
}

type UserData = {
  date?: string,
  displayName: string,
  parroquia: string,
  role: string,
  uid?: string,
  token?: string
}



export default function Home() {

  const [userData, setuserData] = useState<UserData>();
  const [userCookie, setCookie] = useState<string>('');
  const [reduxCookieEmpty, setReduxCookieEmpty] = useState(true);
  const [stateCookieEmpty, setStateCookieEmpty] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch<AppDispatch>()

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const {cookie, userName, parroquia, role} = useTypedSelector( state => state.app )

  async function fetchUserData() {
    try {
      //DATA
      const data = await fetch("/api/getFSUserData"); 
      if (!data.ok) throw new Error("Error en la solicitud");
      const res = await data.json();

      setuserData(res.data);
      dispatch(setUser({name: res.data?.displayName, parroquia: res.data?.parroquia, role: res.data?.role}))
      dispatch(setCookies(userCookie))
      localStorage.setItem('location', res.data.parroquia)
    } catch (err) {
      console.error("Error en la obtención de datos:", err);
      setError(true);
    } finally {
      setDataLoading(false); 
    }
  }

  const initUserCookies = async () => {
    try {
    //COOKIES
     const cookieFetch = await fetch("/api/getUserToken"); 
      if (!cookieFetch.ok) throw new Error("Error en la solicitud");
      const cookie = await cookieFetch.json();
      dispatch(setCookies(cookie.data))
    } catch (err) {
      console.error("Error en la obtención de datos:", err);
      setError(true);
    } finally{
      setReduxCookieEmpty( false )
    }
  }

  const initStateCookies = async () => {
    try {
    //COOKIES
     const cookieFetch = await fetch("/api/getUserToken"); 
      if (!cookieFetch.ok) throw new Error("Error en la solicitud");
      const cookie = await cookieFetch.json();
      setCookie(cookie.data)

    } catch (err) {
      console.error("Error en la obtención de datos:", err);
      setError(true);
    } finally {
      setStateCookieEmpty(false)
    }
  }

  useLayoutEffect( () => {
    if(cookie === ''){
      setReduxCookieEmpty(true)
      initUserCookies()
    } else {
      setReduxCookieEmpty(false)
      initStateCookies()
      setStateCookieEmpty(true)
    }
  }, [])

  useEffect(() => {
    if(!stateCookieEmpty && userCookie != cookie){ 
      fetchUserData() 
    } else { 
      setDataLoading(false) 
    }
  }, [userCookie])


  return (
    <Grid2 container justifyContent='center' direction='row' sx={{height: '100vh', width: '100vw'}}>

       <Grid2 container direction='column' justifyContent='center' alignItems='center' sx={{bgcolor: '#60abf0', width: '42%'}}>
       {dataLoading ? <CircularProgress/> : <Grid2 container direction='column' justifyContent='center' alignItems='center'>
          <Typography variant="h2" fontSize={28} color="white">{`Bienvenido ${userName}`}</Typography>
          <Typography variant="h3" fontSize={25} color="white">{`Parroquia ${parroquias[parroquia]}`}</Typography>
          <Typography variant="h3" fontSize={25} color="white">Usted se encuentra logueado!</Typography>
          <Link href={dashLinks[parroquia]}>
            <Button variant="contained" sx={{mt: 2}}>Ir al panel de control</Button>
          </Link>
        </Grid2>
        }
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
  );
}
