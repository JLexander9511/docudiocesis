import { NextResponse } from "next/server";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { authConfig } from "@/app/config/server-config";
import { PDFDocument, rgb } from 'pdf-lib'; 
import fs from 'fs'; 
import path from 'path';

//const admin = require('firebase-admin');    

export async function POST(request: Request) {

    //const tokens = await getTokens(await cookies(), authConfig);

    try {

        /*if (!tokens) {
            return NextResponse.json({ok: false, message: 'No esta autorizado para realizar esta accion'}) 
          }

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
        }
        
        const db = admin.firestore();*/

        const {data, target} = await request.json()

        //const filePath = path.resolve('@/assets', 'temBautismNew.pdf');
        const filePath = path.join(process.cwd(), 'assets', 'temBautismNew.pdf'); 

        const existingPdfBytes = fs.readFileSync(filePath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pages = pdfDoc.getPages(); 
        const firstPage = pages[0];

        const pdfBytes = await pdfDoc.save();

        const response = new NextResponse(pdfBytes, 
          { 
            headers: 
            { 
              'Content-Disposition': 'attachment; filename=modified.pdf', 
              'Content-Type': 'application/pdf', 
            } 
          }); 
          
        return response;

        //await db.collection(target).doc(data).delete()

        //return NextResponse.json({ok: true, message: 'Exito'}) 
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: error.message })
    }   
    
}

