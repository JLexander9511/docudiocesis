import { printData } from "@/app/(dashboard)/dashboard/components/PrintMechanism"
import { FormBauValues } from "@/app/(dashboard)/dashboard/components/AddAct"

export const printBauAct = async (data: printData) => {

    const res = await fetch('/api/printAct',{
        body: JSON.stringify({
          data,
          target: 'baptisms'
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
  
      return await res.json()
}