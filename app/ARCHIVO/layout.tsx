
import "./styles.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTokens, Tokens } from "next-firebase-auth-edge";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { User } from "../auth/AuthContext";
import Navbar from "./dashboard/components/Navbar";
import { SidebarX } from "./dashboard/components/SidebarX";
import WithState from "../validators/WithState";
import { authConfig } from "../config/server-config";


export const metadata: Metadata = {
  title: "Panel de control - Docudiocesis",
  description: "Documenta registros parroquiales de bautizos, matrimonios, confirmaciones entre otros, generando el acta y otras funcionalidades mas.",
};

const parroquiaPrefixes: Record<string, string> = {
  'milagrosa': 'ml',
  'valle': 'vll',
  'coromoto': 'cm'
}

const toUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;
 
  const customClaims = filterStandardClaims(decodedToken);
 
  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  };
};

export default async function DashLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const tokens = await getTokens( await cookies(), {
    ...authConfig
  });

  const user = tokens ? toUser(tokens) : null;




  return (
    <html lang="en" suppressHydrationWarning>
        <body>
          <WithState>
            <Navbar displayName={user?.displayName} userRole="admin"/>
            <SidebarX/>
            {children} 
          </WithState>
        </body>
    </html>
  );
}
