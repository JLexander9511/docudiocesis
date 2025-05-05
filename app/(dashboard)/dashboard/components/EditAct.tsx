import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  IconButton, Tooltip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { transformarFecha } from '@/utils/transformDate';
import { serverResponse } from './Table';
import { Bounce, toast } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import EditIcon from '@mui/icons-material/Edit';
import { mmddDate } from '@/utils/mmddDate';
import { updateAct } from '@/app/api/controllers/updateAct';
import { multiFormValues } from './AddAct';
import { ActionProps } from './ActionsBar';
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

export const EditAct: FC<ActionProps> = ({refresher, data, id}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeNote, setActiveNote] = useState<boolean>(false)
  const [editData, setEditData] = useState<multiFormValues>({
    id: '',
    numLibro_regEclesiastico: 0,
    numFolio_regEclesiastico: 0,
    numReg_regEclesiastico: 0,
    reg_regCivil: '',
    parroquia_regCivil: '',
    municipio_regCivil: '',
    estado_regCivil: '',
    fechaBautizo: '',
    fechaNacimiento: '',
    bautizadoNombre: '',
    madreNombre: '',
    padreNombre: '',
    padrinoA_nombre: '',
    padrinoB_nombre: '',
    ministro_Nombre: '',
    notaMarginal: null,
    parroquia: '',
    tipo: ''
  })
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<multiFormValues>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const onSubmit: SubmitHandler<multiFormValues> = async (data) => {
    

    if(editData.tipo == 'bautismo'){
      data.fechaBautizo = transformarFecha(data.fechaBautizo)
      data.fechaNacimiento = transformarFecha(data.fechaNacimiento)
      if(!data.notaMarginal) data.notaMarginal = null
    }
    
    data.id = editData.id
    data.tipo = editData.tipo
    
    const secure = confirm('Datos correctos?. Esta seguro que desea actualizar esta acta?')

    if(secure){
      const op: serverResponse = await updateAct(data)
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

  const onClickEdit = () => {
    const [regObject] = data.filter((obj) => obj.id == id)
    handleOpen()
    setEditData(() => regObject)
  }

  useEffect(() => {
    if(editData.tipo == 'bautismo'){
      setValue('numLibro_regEclesiastico', editData.numLibro_regEclesiastico)
      setValue('numFolio_regEclesiastico', editData.numFolio_regEclesiastico)
      setValue('numReg_regEclesiastico', editData.numReg_regEclesiastico)

      setValue('reg_regCivil', editData.reg_regCivil)
      setValue('parroquia_regCivil', editData.parroquia_regCivil)
      setValue('municipio_regCivil', editData.municipio_regCivil)
      setValue('estado_regCivil', editData.estado_regCivil)

      setValue('fechaBautizo', mmddDate(editData.fechaBautizo))
      setValue('fechaNacimiento', mmddDate(editData.fechaNacimiento))
      setValue('bautizadoNombre', editData.bautizadoNombre)
      setValue('madreNombre', editData.madreNombre)
      setValue('padreNombre', editData.padreNombre)
      setValue('padrinoA_nombre', editData.padrinoA_nombre)
      setValue('padrinoB_nombre', editData.padrinoB_nombre)
      setValue('ministro_Nombre', editData.ministro_Nombre)
    
      if(editData.notaMarginal != null){
        setActiveNote(true)
        setValue('notaMarginal', editData.notaMarginal)
      }
    }
  }, [editData])

  return (
    <>
      <Tooltip title="Edit" onClick={() => onClickEdit()}>
          <IconButton>
            <EditIcon />
          </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      > 
        <Box sx={style} borderRadius={4}>
          <Typography variant='h3' fontSize={22} fontWeight='bold'>Editar acta de {editData.tipo}</Typography>
          {editData.tipo == 'bautismo' ? <BautismForm hSubmit={handleSubmit} oSubmit={onSubmit} reg={register} err={errors} reseter={reset}/> : <></>}

        </Box>
      </Modal>
    </>
  );
}