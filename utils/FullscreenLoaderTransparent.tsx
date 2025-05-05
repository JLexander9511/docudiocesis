import { CircularProgress, Grid2 } from "@mui/material"

export const FullscreenLoaderTransparent = () => {
  return (
    <Grid2
    bgcolor='rgba(175, 175, 175, 0.4)'
    container 
    justifyContent='center' 
    alignItems='center' 
    height='100%'
    width='100%'
    zIndex={5}
    sx={{position: 'absolute'}}>
        <CircularProgress size="3rem" />
    </Grid2>
  )
}
