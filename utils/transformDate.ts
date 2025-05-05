export const transformarFecha = (fecha: string) => {
    // Divide la cadena en partes usando el separador "/"
    let partes = fecha.split('-');
    
    // Reorganiza las partes en el formato dd/mm/aaaa
    let nuevaFecha = partes[2] + '/' + partes[1] + '/' + partes[0];
    return nuevaFecha;
}