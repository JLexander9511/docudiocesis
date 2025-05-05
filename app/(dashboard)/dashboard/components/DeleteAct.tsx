import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { FC } from 'react';
import { deleteRegisterFromCollection } from '@/app/api/controllers/deleteRegisterFromCollection';
import { serverResponse } from './Table';
import { Bounce, toast } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import { ActionProps } from './ActionsBar';

export const DeleteAct: FC<ActionProps> = ({id, refresher}) => {

  const handleClickDelete = async  () => {
    if (typeof id === "string") {
       const secure = confirm('Esta seguro de borrar este registro?')
       if(secure){
        const op: serverResponse = await deleteRegisterFromCollection(id)
        if(op.ok){
            toast.success('El registro ha sido eliminado exitosamente!', {
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
            refresher()
          }else{
            toast.error('Ha ocurrido un error al intentar eliminar el registro', {
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
    }
  }
  return (
        <IconButton color="error" onClick={handleClickDelete}>
            <DeleteIcon />
        </IconButton>
  )
}
