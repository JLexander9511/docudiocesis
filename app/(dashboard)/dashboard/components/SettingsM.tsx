"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Fade, FormControl, Input, InputLabel, Stack } from '@mui/material';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { setParroco, setSecretary } from '@/store/app';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AppDispatch, RootState } from '@/store/RootState';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  p: 4,
};

type SettingsMProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function SettingsM({open, setOpen}: SettingsMProps) {

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<AppDispatch>();

  const {secretary, parroco, status} = useTypedSelector( state => state.app )

  const [secretaryName, setSecretaryName] = useState<string>(secretary)
  const [parrocoName, setParrocoName] = useState<string>(parroco)
  const [showSuccess, setShowSuccess] = useState({active: false, origin: ''})
  

  const updating = useMemo(() => status == 'processing' , [status])
  
  const handleClose = () => setOpen(false);

  const handleSecUpdateBtn = (name: string) => {
    setShowSuccess({origin: 'sec', active: true})
    dispatch(setSecretary(name))
  }

  const handleParUpdateBtn = (name: string) => {
    setShowSuccess({origin: 'par', active: true})
   dispatch(setParroco(name))
  }

  useEffect(() => {
    if(status == 'success'){
      setShowSuccess({...showSuccess, active: true})
      setTimeout(() => {
        setShowSuccess({origin: '', active: false})
      }, 4000);
    }
  }, [status])
  
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={4}>
          <Typography id="modal-modal-title" variant="h6" component="h2" pb={4}>
            Panel de configuración
          </Typography>

          <Typography>Introduzca el nombre del secretario que aparecera en las actas.</Typography>

          <Stack direction='row' alignItems='center' justifyContent='left'>
            <FormControl variant="standard" sx={{mr:3}}>
              <InputLabel htmlFor="component-simple">Nombre de Secretario(a)</InputLabel>
              <Input 
                id="component-simple" 
                placeholder='Introduzca el nombre' 
                value={(secretaryName)}
                onChange={(event) => {
                  setSecretaryName(event.target.value);
                }}
                />
                
            </FormControl>
            <LoadingButton
              sx={{mt: 2}}
              loading={updating}
              loadingPosition="center"
              variant="contained"
              onClick={() => handleSecUpdateBtn(secretaryName)}
            >
              Actualizar
            </LoadingButton>

            {(showSuccess.active && showSuccess.origin == 'sec') && <Fade in={showSuccess.active}><CheckCircleIcon color='success' sx={{mt:2, ml:1}}/></Fade>}
          </Stack>

          <Typography mt={2} >Introduzca el nombre del párroco.</Typography>

          <Stack direction='row' alignItems='center' justifyContent='left'>
            <FormControl variant="standard" sx={{mr:3}}>
              <InputLabel htmlFor="component-simple">Nombre de Parroco</InputLabel>
              <Input 
                id="component-simple" 
                placeholder='Introduzca el nombre' 
                value={(parrocoName)}
                onChange={(event) => {
                  setParrocoName(event.target.value);
                }}
                />
                
            </FormControl>
            <LoadingButton
              sx={{mt: 2}}
              loading={updating}
              loadingPosition="center"
              variant="contained"
              onClick={() => handleParUpdateBtn(parrocoName)}
            >
              Actualizar
            </LoadingButton>

            {(showSuccess.active && showSuccess.origin == 'par') && <Fade in={showSuccess.active}><CheckCircleIcon color='success' sx={{mt:2, ml:1}}/></Fade>}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}