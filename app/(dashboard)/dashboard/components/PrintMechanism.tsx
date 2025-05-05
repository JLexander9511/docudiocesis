import PrintIcon from '@mui/icons-material/Print';
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid2, IconButton, Input, Modal, Stack, Typography } from '@mui/material';
import { FormBauValues } from './EditAct';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InfoOutlined } from '@mui/icons-material';
import { printBauAct } from '@/app/api/controllers';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/store/RootState';

interface PrintProps {
    data: FormBauValues[],
    id: string
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
  };

export type printData = {
    motivo: string,
    fechaPrint: string,
    secretary: string,
    parroco: string,
    data: FormBauValues
}

export const PrintMechanism: FC<PrintProps> = ({data, id}) => {

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

    const {secretary, parroco} = useTypedSelector( state => state.app )

    const [printData, setPrintData] = useState<FormBauValues>({
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
        notaMarginal: null
      })
    const [open, setOpen] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<printData>();


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onPrintAction = () => {
        const [regObject] = data.filter((obj) => obj.id == id)
        handleOpen()
        setPrintData(() => regObject)
    }

    const onSubmit: SubmitHandler<printData> = async (data) => {
        data.data = printData
        data.secretary = secretary
        data.parroco = parroco
        const op: any = await printBauAct(data)
        console.log(op)
    }
    
  return (
    <>
    <IconButton color="info" onClick={onPrintAction}>
        <PrintIcon />
    </IconButton>
    <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} borderRadius={4}>
            <Typography variant='h3' fontSize={22} fontWeight='bold'>Imprimir acta de bautismo</Typography>
            <Typography variant='h4' fontSize={18} mt={2}>Por favor indique: </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container direction='column'>
                    <FormControl sx={{mt:2, position:'relative'}} error={!!errors.motivo}>
                        <FormLabel>Motivo de expedicion de acta</FormLabel>
                        <Input
                            sx={{top: -15}}
                            type="text"
                            {...register("motivo", {required: true})}
                        />
                        {errors.motivo &&
                                    <FormHelperText>
                                    <InfoOutlined />
                                        Informacion Requerida
                                    </FormHelperText>}
                    </FormControl>

                    <FormControl sx={{mt:2, position:'relative'}} error={!!errors.fechaPrint}>
                        <FormLabel>Fecha de expedicion *</FormLabel>
                        <input type="date" placeholder="fechaBautizo" {...register("fechaPrint", {required: true})} />
                        {errors.fechaPrint &&
                                    <FormHelperText>
                                        <InfoOutlined />
                                        Fecha requerida
                                    </FormHelperText>}
                    </FormControl>
                </Grid2>

            <Stack mt={3} direction='row' justifyContent='center'>
                <Button variant="contained" type='submit'>Imprimir</Button>
                <Button variant="contained" onClick={() => reset()} sx={{mx: 1}}>Reset</Button>
            </Stack>
            
            </form> 
        </Box>
    </Modal>
    </>
    
  )
}
