import { Request, Response } from 'express';
import pool from '../config/bd.js';

export async function listar(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM empleado ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function obtener(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM empleado WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function crear(req: Request, res: Response) {
  try {
    const { nombre, apellido, telefono, email } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'nombre y apellido son obligatorios' });
    }
    const { rows } = await pool.query(
      `INSERT INTO empleado (nombre, apellido, telefono, email)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, apellido, telefono || null, email || null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email ya registrado' });
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function actualizar(req: Request, res: Response) {
  try {
    const { nombre, apellido, telefono, email } = req.body;
    const { rows } = await pool.query(
      `UPDATE empleado SET nombre = $1, apellido = $2, telefono = $3, email = $4
       WHERE id = $5 RETURNING *`,
      [nombre, apellido, telefono || null, email || null, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(rows[0]);
  } catch (err: any) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email ya registrado' });
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function eliminar(req: Request, res: Response) {
  try {
    const { rowCount } = await pool.query('DELETE FROM empleado WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}   