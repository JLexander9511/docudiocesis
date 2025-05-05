import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
    try{
        
            return NextResponse.json({ok: true, message: 'Exito', data: (await cookies()).get('AuthToken')?.value}) 
        } catch (error: any) {
            return NextResponse.json({ ok: false, message: error.message })
        }   
}
