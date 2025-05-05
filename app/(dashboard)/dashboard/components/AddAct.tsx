import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { transformarFecha } from '@/utils/transformDate';
import { serverResponse } from './Table';
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ActionProps } from './ActionsBar';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/store/RootState';
import { registerAct } from '@/app/api/controllers';
import { BautismForm } from '../views/bautismo/components/BautismForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  p: 4,
};

export type multiFormValues = FormBauValues 

export type FormBauValues = {
  id: string,
  numLibro_regEclesiastico: number,
  numFolio_regEclesiastico: number,
  numReg_regEclesiastico: number,
  reg_regCivil: string,
  parroquia_regCivil: string,
  municipio_regCivil: string,
  estado_regCivil: string,
  fechaBautizo: string,
  fechaNacimiento: string,
  bautizadoNombre: string,
  madreNombre: string,
  padreNombre: string,
  padrinoA_nombre: string,
  padrinoB_nombre: string,
  ministro_Nombre: string,
  notaMarginal?: string | null,
  parroquia: string,
  tipo: string
}

export const AddAct: FC<ActionProps> = ({refresher, type}) => {
  
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<multiFormValues>();

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const {parroquia} = useTypedSelector( state => state.app )

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const onSubmit: SubmitHandler<multiFormValues> = async (data) => {
    if(type == 'bautismo'){
      data.fechaBautizo = transformarFecha(data.fechaBautizo)
      data.fechaNacimiento = transformarFecha(data.fechaNacimiento)
      if(!data.notaMarginal) data.notaMarginal = null
    }
    
    data.parroquia = parroquia
    data.tipo = type
  
    const secure = confirm('Datos correctos?. Esta seguro que desea registrar esta acta?')

    if(secure){
      const op: serverResponse = await registerAct(data)
      if(op.ok){
        toast.success('El registro ha sido guardado exitosamente!', {
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
        reset()
        setOpen(false)
        refresher()
      }else{
        toast.error('Ha ocurrido un error al intentar guardar sus datos', {
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

  };

  return (
    <>
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
      <Button variant="contained" onClick={handleOpen}>{`Añadir acta de ${type}`}</Button>
      <Modal
        open={open}
        onClose={handleClose}
      > 
        <Box sx={style} borderRadius={4}>
          <Typography variant='h3' fontSize={22} fontWeight='bold'>{`Registrar acta de ${type}`}</Typography>

          {type == 'bautismo' ? <BautismForm hSubmit={handleSubmit} oSubmit={onSubmit} reg={register} err={errors} reseter={reset}/> 
                              : null}
          
        </Box>
      </Modal>
    </>
  );
}