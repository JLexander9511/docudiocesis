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


    const docRef = db.collection('users').doc(tokens.decodedToken.uid);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      return new Error('No existe usuario')
    }
        return NextResponse.json({ok: true, message: 'Exito', data: docSnap.data()}) 
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: error.message })
    }   
    
}
