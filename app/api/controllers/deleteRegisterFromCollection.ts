export const deleteRegisterFromCollection = async (data: string) => {

    const res = await fetch('/api/deleteRegister',{
        body: JSON.stringify({
          data
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
  
      return await res.json()
}
