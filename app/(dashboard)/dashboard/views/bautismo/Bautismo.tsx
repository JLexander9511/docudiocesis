import { CircularProgress, Grid2, Stack, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Table from '../../components/Table'
import { FormBauValues } from '../../components/AddAct'
import { getAllRegs } from '@/app/api/controllers/getAllRegs'
import { Bounce, toast } from 'react-toastify'
import { deleteRegisterFromCollection } from '@/app/api/controllers/deleteRegisterFromCollection'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '@/store/RootState'
import { ActionsBar } from '../../components/ActionsBar'

export interface serverResponse {
  ok: boolean,
  message: string,
  data: FormBauValues[]
}

export type dataRequestProps = {
  type: string,
  parroquia: string,
}

export const Bautismo = () => {

  const [data, setData] = useState<FormBauValues[]>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { parroquia, secSelector } = useTypedSelector( state => state.app )

  const props = {
    type: secSelector,
    parroquia,
  }

  const getRegisters = async (): Promise<void> => {
    
    const op: serverResponse = await getAllRegs(props)
    if(op.ok) {
     setLoading(false)
     setData(() => op.data)
    } else {
      setLoading(true)
      toast.error('Ha ocurrido un error al intentar obtener los datos', {
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

  const refreshTable = async (): Promise<void> => {
    const op: serverResponse = await getAllRegs(props)
    if(op.ok) setData(() => op.data)
  }

  useEffect(() => {
    getRegisters()
  }, [])

  return (
    <Grid2 container py={2} px={4} width='100vw'>
      <Stack direction='row' justifyContent='center' alignItems='center' width='100vw' mb={2}>
      <Typography variant='h2' fontSize={32} mb={1} width='30%' mt={1}>Actas de Bautismo</Typography>
      <ActionsBar refresher={refreshTable} type = {secSelector}/>
      </Stack>
      {isLoading ? <CircularProgress sx={{margin: '2.5rem 2.5rem'}}/> 
                     : <Table 
                            data = {data} 
                            refresher = {refreshTable}
                            tipo = {secSelector}
                            />}
    </Grid2>
  )
}

