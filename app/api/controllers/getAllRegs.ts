import { dataRequestProps } from "@/app/(dashboard)/dashboard/views/bautismo/Bautismo"



export const getAllRegs = async (data:dataRequestProps) => {

    const res = await fetch('/api/getAllRegisters',{
        headers: {
          "Content-Type": "application/json",
          "tipo": data.type,
          "parroquia": data.parroquia
        },
        method: "GET",
      })

      return await res.json()
}