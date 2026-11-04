import { Router } from 'express';
import {
    listarCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoriaPermanente
} from '../controllers/categoriesControllers.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createCategorySchema, updateCategorySchema } from '../schemas/categoriesSchema.js';

const router: Router = Router();

// GET /api/categories - Listar todas las categorías
router.get('/', listarCategorias);

// GET /api/categories/:id - Obtener categoría por ID
router.get('/:id', obtenerCategoriaPorId);

// POST /api/categories - Crear categoría
router.post('/', validateSchema(createCategorySchema), crearCategoria);

// PUT /api/categories/:id - Actualizar categoría
router.put('/:id', validateSchema(updateCategorySchema), actualizarCategoria);

// DELETE /api/categories/:id - Eliminar categoría
router.delete('/:id', eliminarCategoriaPermanente);

export default router;
