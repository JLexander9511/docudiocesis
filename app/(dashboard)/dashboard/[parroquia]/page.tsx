"use client";

import { Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Bautismo } from "../views/bautismo/Bautismo";
import { Comunion } from "../views/comunion/Comunion";
import { Confirmacion } from "../views/confirmacion/Confirmacion";
import { Matrimonio } from "../views/matrimonio/Matrimonio";
import { Difuntos } from "../views/difuntos/Difuntos";
import { AppDispatch, RootState } from "@/store/RootState";
import { dashLinks } from "@/app/(home)/page";


export let links: Record<string, string> = {
  'milagrosa': 'ml',
  'valle': 'vll',
  'coromoto': 'cm',
}


export default function page() {
  const location = window.location.pathname.substring(1)

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

  const {secSelector, parroquia} = useTypedSelector( state => state.app )
  const [components, setComponents] = useState<JSX.Element>(<Bautismo/>)
  
  const router = useRouter();

  const selector = (selection: string) => {
    switch (selection) {
      case 'bautismo':
        setComponents(<Bautismo/>)
        break;
      
      case 'comunion':
        setComponents(<Comunion/>)
        break;

       case 'confirmacion':
        setComponents(<Confirmacion/>)
        break;

      case 'matrimonio':
        setComponents(<Matrimonio/>)
        break;

      case 'difuntos':
        setComponents(<Difuntos/>)
        break;
    }
  }

  useLayoutEffect(() => {
    if(location != dashLinks[parroquia]){
      router.push(`${links[parroquia]}`)
    } 
      
  }, [])
  
  useEffect(() => {
    selector(secSelector)
  }, [secSelector])

  return (
    <Grid2 container pl='75px' pt='5px'>
      {components}
    </Grid2>
    
  )
}
