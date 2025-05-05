export const serverConfig = {
    useSecureCookies: process.env.USE_SECURE_COOKIES === 'false',
    firebaseApiKey: process.env.FIREBASE_API_KEY!,
    serviceAccount: process.env.FIREBASE_ADMIN_PRIVATE_KEY
      ? {
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(
            /\\n/g,
            '\n'
          )!
        }
      : undefined
  };

export const authConfig = {
    apiKey: serverConfig.firebaseApiKey,
    cookieName: 'AuthToken',
    cookieSignatureKeys: [
      process.env.COOKIE_SECRET_CURRENT!,
      process.env.COOKIE_SECRET_PREVIOUS!
    ],
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
      sameSite: 'lax' as const,
      maxAge: 1 * 60 * 60 * 24 // one days
    },
    serviceAccount: serverConfig.serviceAccount,
    authorizationHeaderName: 'Authorization',
  };