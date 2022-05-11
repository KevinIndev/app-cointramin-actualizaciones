import { Message } from "primeng/api";

/**
 * Contiene los estados que se manejan en el Server en las peticiones
 * @author InDev Develops.
 */
export var response_standars = {
    success: 'SUCCESS',
    warning: 'WARNING',
    error: 'ERROR'
}

/**
 * Mapea el objeto necesario para generar un mensaje en PrimeNG 
 * @param {string} status Describe el estado del mensaje y su interfaz UI.
 * @param {string} message Recibe el mesaje a mostrar.
 * @returns Un objeto con los parametros para el ADD del servicio.
 */
export function map_message_service(status: string, message: string){
    let map_summary = 'Sistema InDev Applications'
    let result: Message;

    if(status === response_standars.success){
        result = {severity:'success', summary:map_summary, detail:message};
    } else {
        if(status === response_standars.warning){
            result = {severity:'warn', summary:map_summary, detail:message}
        } else {
            result = {severity:'error', summary:map_summary, detail:message}
        }
    }

   

    return result;
}

/**
 * Metodo que permite mapear un error en consola para validar procesos de LOG
 * @param error {any} error a mostrar en consola.
 * @author @copyright 2022. Indev Develops
 */
export function MapErrorConsole(error:any){
    const message = error.error.status?error.error.message: 'Error no identificado. Comuniquese con soporte';
    console.log('>> ERROR DEL SERVIDOR: ' + message);
    console.log(error as any);
}