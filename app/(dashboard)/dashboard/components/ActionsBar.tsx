import { Grid2 } from "@mui/material"
import { FC } from "react"
import { AddAct, multiFormValues } from "./AddAct"

export interface ActionProps {
  refresher: () => Promise<void>
  data?: multiFormValues[],
  type?: string,
  id?: string
}

export const ActionsBar: FC<ActionProps> = ({refresher, type}) => {
  return (
    <Grid2 bgcolor='#ececec' boxShadow={1} width='100%' padding={2}>
        <AddAct refresher={refresher} type ={type}/>
    </Grid2>
  )
}
