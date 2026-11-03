import { query } from "../config/bd.ts";
export type Proveedor = {
  id: number;
  nombre_empresa: string;
  contacto_nombre: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
};
export type ProveedorInput = {
  nombre_empresa: string;
  contacto_nombre?: string | null;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
};
export const crearProveedorModel = async (
  proveedor: ProveedorInput,
): Promise<Proveedor> => {
  const { nombre_empresa, contacto_nombre, telefono, email, direccion } =
    proveedor;
  const result = await query(
    `INSERT INTO proveedor (nombre_empresa, contacto_nombre, telefono, email, direccion)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      nombre_empresa,
      contacto_nombre ?? null,
      telefono ?? null,
      email ?? null,
      direccion ?? null,
    ],
  );
  return result.rows[0] as Proveedor;
};
export const listarProveedoresModel = async (): Promise<Proveedor[]> => {
  const result = await query("SELECT * FROM proveedor ORDER BY id");
  return result.rows as Proveedor[];
};
export const obtenerProveedorModel = async (
  id: string,
): Promise<Proveedor | null> => {
  const result = await query("SELECT * FROM proveedor WHERE id = $1", [id]);
  return (result.rows[0] as Proveedor | undefined) ?? null;
};
export const actualizarProveedorModel = async (
  id: string,
  proveedor: ProveedorInput,
): Promise<Proveedor | null> => {
  const { nombre_empresa, contacto_nombre, telefono, email, direccion } =
    proveedor;
  const result = await query(
    `UPDATE proveedor
     SET nombre_empresa = $1,
         contacto_nombre = $2,
         telefono = $3,
         email = $4,
         direccion = $5
     WHERE id = $6
     RETURNING *`,
    [
      nombre_empresa,
      contacto_nombre ?? null,
      telefono ?? null,
      email ?? null,
      direccion ?? null,
      id,
    ],
  );
  return (result.rows[0] as Proveedor | undefined) ?? null;
};
export const eliminarProveedorModel = async (
  id: string,
): Promise<Proveedor | null> => {
  const result = await query(
    "DELETE FROM proveedor WHERE id = $1 RETURNING *",
    [id],
  );
  return (result.rows[0] as Proveedor | undefined) ?? null;
};
