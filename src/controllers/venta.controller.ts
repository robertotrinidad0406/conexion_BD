import { Request, Response } from 'express';
import pool from '../config/bd.js';

export async function listar(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM venta ORDER BY id');
    res.json(rows);
  } catch (err) {
     console.error(err); 
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function obtener(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM venta WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function crear(req: Request, res: Response) {
  try {
    const { id_cliente, id_empleado, fecha_venta, total_venta } = req.body;
    if (!id_cliente || !id_empleado || total_venta == null) {
      return res.status(400).json({ error: 'id_cliente, id_empleado y total_venta son obligatorios' });
    }
    const { rows } = await pool.query(
      `INSERT INTO venta (id_cliente, id_empleado, fecha_venta, total_venta)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_cliente, id_empleado, fecha_venta || new Date().toISOString().split('T')[0], total_venta]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    if (err.code === '23503') return res.status(400).json({ error: 'Cliente o empleado no existe' });
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function actualizar(req: Request, res: Response) {
  try {
    const { id_cliente, id_empleado, fecha_venta, total_venta } = req.body;
    const { rows } = await pool.query(
      `UPDATE venta SET id_cliente = $1, id_empleado = $2, fecha_venta = $3, total_venta = $4
       WHERE id = $5 RETURNING *`,
      [id_cliente, id_empleado, fecha_venta || null, total_venta, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(rows[0]);
  } catch (err: any) {
    if (err.code === '23503') return res.status(400).json({ error: 'Cliente o empleado no existe' });
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function eliminar(req: Request, res: Response) {
  try {
    const { rowCount } = await pool.query('DELETE FROM venta WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Venta no encontrada' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function porCliente(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM venta WHERE id_cliente = $1', [req.params.idCliente]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function porEmpleado(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM venta WHERE id_empleado = $1', [req.params.idEmpleado]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}   