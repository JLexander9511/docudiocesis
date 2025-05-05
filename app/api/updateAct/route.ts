import { NextRequest, NextResponse } from "next/server";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { authConfig } from "@/app/config/server-config";
import { serviceAccount } from "@/middleware";


const admin = require('firebase-admin');    

export async function POST(request: NextRequest) {

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
        
        const {data}: {data: any, target: string} = await request.json();
        
        const db = admin.firestore();
        const userDoc = await db.collection('registros').doc(data.id).update({
          ...data
        });

        return NextResponse.json({ok: true, message: 'Exito'}) 
    } catch (error: any) {
      console.log(error.message)
        return NextResponse.json({ ok: false, message: error.message })
    }   
    
}

