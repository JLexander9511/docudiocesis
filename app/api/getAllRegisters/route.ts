import { NextResponse } from "next/server";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";
import { authConfig } from "@/app/config/server-config";
import { serviceAccount } from "@/middleware";

const admin = require('firebase-admin');    

export async function GET() {

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

        const metadata = await headers()
        const tipo = metadata.get('tipo')
        const parroquia = metadata.get('parroquia')
        const registers: object[] = []

        const querySnapshot = await db.collection('registros')
          .where('parroquia', '==', parroquia)
          .where('tipo', '==', tipo)
          .get();
      
        querySnapshot.forEach((doc: any) => {
          registers.push(doc.data())
        });

        return NextResponse.json({ok: true, message: 'Exito', data: registers}) 
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: error.message })
    }   
    
}

