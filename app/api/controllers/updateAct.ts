import { multiFormValues } from "@/app/(dashboard)/dashboard/components/AddAct"

export const updateAct = async (data: multiFormValues) => {

    const res = await fetch('/api/updateAct',{
        body: JSON.stringify({
          data
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
  
      return await res.json()
}