import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { getTokens, Tokens } from "next-firebase-auth-edge";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { AuthProvider } from "./auth/AuthProvider";
import { User } from "./auth/AuthContext";
import { authConfig } from "./config/server-config";
import WithState from "./validators/WithState";

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

export const metadata: Metadata = {
  title: "Documentacion Parroquial - Docudiocesis",
  description: "Documenta registros parroquiales de bautizos, matrimonios, confirmaciones entre otros, generando el acta y otras funcionalidades mas.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const tokens = await getTokens( await cookies(), {
    ...authConfig
  });

  const user = tokens ? toUser(tokens) : null;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider user={ user }>
          <WithState>
            {children}
          </WithState>
        </AuthProvider>
      </body>
    </html>
  );
}
