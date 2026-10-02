export const sesion = { nombre: '' };

//definicion de interfaz tarea
export interface Tarea {
  key: string;
  value: string;
  descripcion?: string;
  fecha: string; // "YYYY-MM-DD"
}
//donde se guarda
export const STORAGE_KEY = "@mis_tareas_app";
