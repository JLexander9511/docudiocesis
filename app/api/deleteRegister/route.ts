import { NextResponse } from "next/server";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { authConfig } from "@/app/config/server-config";
import { serviceAccount } from "@/middleware";

const admin = require('firebase-admin');    


export async function DELETE(request: Request) {

    const tokens = await getTokens(await cookies(), authConfig);

    try {

        if (!tokens) {
            return NextResponse.json({ok: false, message: 'No esta autorizado para realizar esta accion'}) 
          }

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
        }
        
        const db = admin.firestore();

        const {data} = await request.json()

        await db.collection('registros').doc(data).delete()

        return NextResponse.json({ok: true, message: 'Exito'}) 
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: error.message })
    }   
    
}

