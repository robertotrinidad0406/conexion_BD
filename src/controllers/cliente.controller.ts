import { Request, Response } from 'express';
import pool from '../config/bd.js';

export async function listar(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM cliente ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function obtener(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM cliente WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function crear(req: Request, res: Response) {
  try {
    const { nombre, apellido, documento, telefono, email } = req.body;
    if (!nombre) return res.status(400).json({ error: 'nombre es obligatorio' });
    const { rows } = await pool.query(
      `INSERT INTO cliente (nombre, apellido, documento, telefono, email)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, apellido || null, documento || null, telefono || null, email || null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    if (err.code === '23505') return res.status(409).json({ error: 'Documento o email ya registrado' });
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function actualizar(req: Request, res: Response) {
  try {
    const { nombre, apellido, documento, telefono, email } = req.body;
    const { rows } = await pool.query(
      `UPDATE cliente SET nombre = $1, apellido = $2, documento = $3, telefono = $4, email = $5
       WHERE id = $6 RETURNING *`,
      [nombre, apellido || null, documento || null, telefono || null, email || null, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (err: any) {
    if (err.code === '23505') return res.status(409).json({ error: 'Documento o email ya registrado' });
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function eliminar(req: Request, res: Response) {
  try {
    const { rowCount } = await pool.query('DELETE FROM cliente WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
}   