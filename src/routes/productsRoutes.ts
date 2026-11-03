import { Router } from 'express';
import {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProductoPermanente
} from '../controllers/productsControllers.js';

const router: Router = Router();

// GET /api/products - Listar todos los productos
router.get('/', listarProductos);

// GET /api/products/:id - Obtener producto por ID
router.get('/:id', obtenerProductoPorId);

// POST /api/products - Crear producto
router.post('/', crearProducto);

// PUT /api/products/:id - Actualizar producto
router.put('/:id', actualizarProducto);

// DELETE /api/products/:id - Eliminar producto
router.delete('/:id', eliminarProductoPermanente);

export default router;

