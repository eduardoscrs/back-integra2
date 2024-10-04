import express from 'express';
import {
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
} from '../controllers/materialController.js';

const router = express.Router();

/**
 * @openapi
 * /api/v1/materiales:
 *   post:
 *     tags:
 *       - Materiales
 *     summary: Crear un nuevo material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_material:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               precio:
 *                 type: number
 *               medida:
 *                 type: string
 *     responses:
 *       201:
 *         description: Material creado exitosamente
 *       400:
 *         description: Faltan datos necesarios
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createMaterial);

/**
 * @openapi
 * /api/v1/materiales:
 *   get:
 *     tags:
 *       - Materiales
 *     summary: Obtener todos los materiales
 *     responses:
 *       200:
 *         description: Lista de materiales obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/', getMaterial);

/**
 * @openapi
 * /api/v1/materiales/{id}:
 *   put:
 *     tags:
 *       - Materiales
 *     summary: Actualizar un material específico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_material:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               precio:
 *                 type: number
 *               medida:
 *                 type: string
 *     responses:
 *       200:
 *         description: Material actualizado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Material no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', updateMaterial);

/**
 * @openapi
 * /api/v1/materiales/{id}:
 *   delete:
 *     tags:
 *       - Materiales
 *     summary: Eliminar un material específico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Material eliminado exitosamente
 *       404:
 *         description: Material no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', deleteMaterial);

export default router;
