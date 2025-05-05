"use client";

import { InfoOutlined } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, Grid2, Input, Paper, Select, Stack, Typography } from "@mui/material"
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { Bounce, toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth  } from "firebase/auth";
import { FirebaseApp } from "@/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

export type RegisterFormValues = {
  email: string,
  password: string,
  nombre: string,
  parroquia: string,
}

export default function Register () {

  const { register, handleSubmit, formState: { errors }, } = useForm<RegisterFormValues>()

  const pwdError = useMemo(() => !!errors.password , [errors])
  const emailError = useMemo(() => !!errors.email , [errors])
  const nombreError = useMemo(() => !!errors.nombre , [errors])

  const router = useRouter();

  const returnLogin = ():void => {
    router.push('/login')
  }

  const onSubmit: SubmitHandler<RegisterFormValues> = async ({email, password, nombre, parroquia}) => {
    console.log(errors)
    const secure = prompt('Introduzca contraseña')
    if(secure == 'diocesis123'){   
      try {
        const resp = await createUserWithEmailAndPassword(getAuth(FirebaseApp), email, password)

        const db = getFirestore();
        
        await setDoc(doc(db, "users", resp.user.uid), {
          uid: resp.user.uid,    
          displayName: nombre,
          parroquia,
          date: new Date().toLocaleString(),
          role: 'regular'
      })

      toast.success('Usuario registrado!, retornando al inicio de sesion.', {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        setTimeout(() => {
          router.push('/login');
        }, 3500);

      } catch (error: any) {

        let message = (error.message == 'Firebase: Error (auth/email-already-in-use).') ? 'Usuario ya registrado.' : 'Ocurrio un error al registrar el usuario.'
        toast.error(message, {
          position: "top-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }

    } else {
      alert('Contraseña Incorrecta')
    }
  }

  //GESTIONAR MIDDLEWARE QUE PUEDA HACER POSIBLE QUE ESTA RUTA ESTE PROTEGIDA
  return (
    <Grid2 container bgcolor='rgba(237, 237, 237, 1)' justifyContent='center' direction='row' sx={{height: '100vh', width: '100vw'}}>
        
        <ToastContainer
                    position="top-left"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    ></ToastContainer>

        <Grid2 my='3%'>
          <Paper elevation={1} sx={{bgcolor:'white', padding:'1.5rem 3rem'}}>

            <Grid2 container onClick={returnLogin} width={40} className='justify-center rounded rounded-xl hover:bg-stone-200 self-center' py={1} marginLeft={-0.5}>
              <ArrowBackIcon sx={{alignSelf: 'center'}}/>
            </Grid2>

            <Typography variant="h4" fontSize={24} fontWeight='bold'>Registrar usuario</Typography>

            <Divider sx={{mt:1}}/>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                <Stack direction='column'>

                    <FormControl error = {nombreError}>
                      <FormLabel>Nombre completo</FormLabel>
                      <Input
                          type="text"
                          placeholder="Nombre"
                          {...register("nombre", {required: true})}
                      />
                      {nombreError &&
                                  <FormHelperText>
                                  <InfoOutlined />
                                  Ingrese nombre, requerido.
                                  </FormHelperText>}
                    </FormControl>

                    <FormControl sx={{my: 2}}>
                      <FormLabel>Parroquia</FormLabel>

                      <select {...register("parroquia")} className="mt-2 py-2 px-1 border-2 border-solid rounded-lg border-stone-300">
                        <option value="milagrosa">Nuestra Sra. de la Medalla Milagrosa</option>
                        <option value="coromoto">Nuestra Sra. de Coromoto</option>
                        <option value="valle">Nuestra Sra. del Valle</option>
                      </select>

                    </FormControl>
                
                    <FormControl error = {emailError} sx={{my: 2}}>
                      <FormLabel>Email</FormLabel>
                      <Input
                          type="text"
                          placeholder="johndoe@email.com"
                          {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                      />
                      {emailError &&
                                  <FormHelperText>
                                  <InfoOutlined />
                                  Ingrese su correo correctamente
                                  </FormHelperText>}
                    </FormControl>
                
                    <FormControl sx={{mt:2}} error = {pwdError}>
                      <FormLabel>Contraseña</FormLabel>
                      <Input
                          type="password"
                          placeholder="Contraseña"
                          {...register("password", {required: true, max: 22, min: 6, maxLength: 22})}
                      />
                      {pwdError &&
                                  <FormHelperText>
                                  <InfoOutlined />
                                  Ingrese su contraseña
                                  </FormHelperText>}               
                    </FormControl>
                
                </Stack>
                <Button sx={{mt: 2}} variant="contained" type="submit">Registrarse</Button>
            </form>
          </Paper>
        </Grid2>

    </Grid2>
  )
}
