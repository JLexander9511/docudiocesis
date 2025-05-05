import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, getTokens, redirectToHome, redirectToLogin } from "next-firebase-auth-edge";
import { authConfig, serverConfig } from "./app/config/server-config";
import { cookies, headers } from "next/headers";
import { dashLinks } from "./app/(home)/page";

const PUBLIC_PATHS = ['/login', '/register'];

//const admin = require('firebase-admin');

export const serviceAccount = {
  type: process.env.GOOGLE_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN
};

const projectID = serverConfig.serviceAccount?.projectId || ''
const clientEMAIL = serverConfig.serviceAccount?.clientEmail || ''
const privateKEY = serverConfig.serviceAccount?.privateKey || ''
 
export async function middleware(request: NextRequest) {
  
  if (request.nextUrl.pathname == '/dashboard') {
    return redirectToHome(request);
  }

  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: authConfig.apiKey,
    cookieName: "AuthToken",
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // Set this to true on HTTPS environments
      sameSite: "lax" as const,
      maxAge: 1 * 60 * 60 * 24, // One day
    },
    serviceAccount: {
      projectId: projectID,
      clientEmail: clientEMAIL,
      privateKey: privateKEY
    },
    authorizationHeaderName: 'Authorization',
    handleValidToken: async ({token, decodedToken}, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }
 
      return NextResponse.next({
        request: {
          headers
        }
      });
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', {reason});
      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS
      });
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', {error});
 
      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS
      });
    }
    
  });

}
 
export const config = {
  matcher: ["/api/login", "/api/logout", "/", "/((?!_next|favicon.ico|api|.*\\.).*)"],
};