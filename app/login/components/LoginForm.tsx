"use client";

import { InfoOutlined } from "@mui/icons-material"
import { Button, Divider, FormControl, FormHelperText, FormLabel, Input, Link, Paper, Stack, Typography } from "@mui/material"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMemo } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseApp } from "@/firebase/"


type FormValues = {
    email: string,
    password: string
}

export const LoginForm = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm<FormValues>()
  const router = useRouter();

  const pwdError = useMemo(() => !!errors.password , [errors])
  const emailError = useMemo(() => !!errors.email , [errors])


  const onSubmit: SubmitHandler<FormValues> = async ({email, password}) => {

    try {

      const credential = await signInWithEmailAndPassword(
        getAuth(FirebaseApp),
        email,
        password
      );

      //SETEAR LOS MENSAJES DE ERROR
      const idToken = await credential.user.getIdToken();
      // Sets authenticated browser cookies
      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      toast.success('Usuario autenticado con exito!', {
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
        router.refresh();
      }, 3500);

      
    } catch (error: any) {
    let message = (error.message == 'Firebase: Error (auth/invalid-credential).') ? 'Credenciales invalidas' : 'Error de autenticacion'
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


  }

  const onRegisterNewUser = (): void => {
      router.push('/register')
  }

  return (
    <Paper elevation={1} sx={{bgcolor:'white', padding:'1.5rem 3rem'}}>

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

        <Typography variant="h4" fontSize={24} fontWeight='bold'>Inicio de sesión</Typography>

        <Divider sx={{mt:1}}/>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <Stack direction='column'>

                <FormControl error = {emailError}>
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
            <Stack direction='row' mt={2}>
              <Typography onClick={onRegisterNewUser} color="rgba(0, 0, 0, 0.6)" sx={{textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }, cursor: 'pointer'}}>Agregar nuevo usuario</Typography>
            </Stack>
            <Button sx={{mt: 2}} variant="contained" type="submit">Loguearse</Button>
        </form>
    </Paper>
  )
}
