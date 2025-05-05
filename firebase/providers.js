import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const loginWithEmailPassword = async ({ email: correo, password }) => {
    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, correo, password);
        const { displayName, email, uid } = resp.user

        return {
            ok: true,
            displayName, 
            email, 
            uid
        }

    } catch (error) {
        return {
            
            ok: false,
            errorMessage: error.message
        }
    }
    
}

export const registerUserWithEmailPassword = async ({displayName, email, password}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        updateProfile(FirebaseAuth.currentUser,{ displayName })
        
        return{
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut() 
}