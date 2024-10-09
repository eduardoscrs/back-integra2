import express from 'express';
import {
  createCaso,
  getCasos,
  updateCaso,
  deleteCaso,
  actualizarEstadoCaso,
} from '../controllers/casoController.js';

const router = express.Router();

/**
 * @openapi
 * /api/v1/casos:
 *   post:
 *     tags:
 *       - Casos
 *     summary: Crear un nuevo caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               campo_1:
 *                 type: string
 *               campo_2:
 *                 type: string
 *               campo_3:
 *                 type: integer
 *               campo_4:
 *                 type: integer
 *               campo_5:
 *                 type: integer
 *               campo_6:
 *                 type: integer
 *               lista_objetos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     atributo_1:
 *                       type: string
 *                     atributo_2:
 *                       type: string
 *                     atributo_3:
 *                       type: number
 *                     atributo_4:
 *                       type: number
 *     responses:
 *       201:
 *         description: caso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: caso creado exitosamente
 *                 id_registro:
 *                   type: integer
 *       400:
 *         description: Error en los datos recibidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en los datos
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', createCaso);

/**
 * @openapi
 * /api/v1/casos:
 *   get:
 *     tags:
 *       - Casos
 *     summary: Obtener todos los casos
 *     responses:
 *       200:
 *         description: Lista de casos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */

router.get('/', getCasos);

/**
 * @openapi
 * /api/v1/casos/{id}:
 *   get:
 *     tags:
 *       - Casos
 *     summary: Obtener un caso específico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del caso obtenidos exitosamente
 *       404:
 *         description: caso no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', getCasos);

/**
 * @openapi
 * /api/v1/casos/{id}:
 *   put:
 *     tags:
 *       - Casos
 *     summary: Actualizar un caso específico
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
 *               atributo1:
 *                 type: string
 *               atributo2:
 *                 type: string
 *     responses:
 *       200:
 *         description: caso actualizado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 *       500:
 *         description: Error en el servidor
 */

router.put('/:id', updateCaso);

/**
 * @openapi
 * /api/v1/casos/{id}:
 *   delete:
 *     tags:
 *       - Casos
 *     summary: Eliminar un caso específico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: caso eliminado exitosamente
 *       404:
 *         description: caso no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.delete('/:id', deleteCaso);

/**
 * @openapi
 * /api/v1/casos/{id}/estado:
 *   put:
 *     tags:
 *       - Casos
 *     summary: Actualizar el estado de un caso específico
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
 *               estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Error en los datos
 *       500:
 *         description: Error en el servidor
 */

router.put('/:id/estado', actualizarEstadoCaso);

export default router;
