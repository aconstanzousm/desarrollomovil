export const sesion = { nombre: '' };

//definicion de interfaz tarea
export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha: string; // "AAAA-MM-DD"
}
//donde se guarda
export const CLAVE_ALMACENAMIENTO = "@mis_tareas_app";
