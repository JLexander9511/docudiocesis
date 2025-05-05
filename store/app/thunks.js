const { setUsername, setParroquia, setRole, setSelector, setCookie } = require("./slices")

export const setUser = (data) => {
    return async (dispach) => {
        dispach(setUsername(data.name))
        dispach(setParroquia(data.parroquia))
        dispach(setRole(data.role))
    }
}

export const setCookies = (data) => {
    return async (dispach) => {
        dispach(setCookie(data))
    }
}

export const selector = (data) => {
    return async (dispach) => {
        dispach(setSelector(data))
    }
}

export const setSecretary = (name) => {
    return async (dispach) => {
        try {
            dispach(setProcessing())
            dispach(changeSecretary(name))
            dispach(setSuccess('Registro secretario actualizado'))
            setTimeout(() => {
                dispach(setIdle())
            }, 1000);
        } catch (error) {
            dispach(setError(error.message))
        }
        

    }
}

export const setParroco = (name) => {
    return async (dispach) => {
        try {
            dispach(setProcessing())
            dispach(changeParroco(name))
            dispach(setSuccess('Registro parroco actualizado'))
            setTimeout(() => {
                dispach(setIdle())
            }, 1000);
        } catch (error) {
            dispach(setError(error.message))
        }
        

    }
}