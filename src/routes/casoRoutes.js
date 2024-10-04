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
 *               tipo_siniestro:
 *                 type: string
 *                 description: Tipo de siniestro
 *               descripcion_siniestro:
 *                 type: string
 *                 description: Descripción del siniestro
 *               ID_Cliente:
 *                 type: integer
 *                 description: ID del cliente
 *               ID_inspector:
 *                 type: integer
 *                 description: ID del inspector
 *               ID_contratista:
 *                 type: integer
 *                 description: ID del contratista
 *               ID_estado:
 *                 type: integer
 *                 description: ID del estado del caso
 *               sectores:
 *                 type: array
 *                 description: Lista de sectores asociados al caso
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre_sector:
 *                       type: string
 *                       description: Nombre del sector
 *                     dano_sector:
 *                       type: string
 *                       description: Descripción del daño en el sector
 *                     porcentaje_perdida:
 *                       type: number
 *                       description: Porcentaje de pérdida en el sector
 *                     total_costo:
 *                       type: number
 *                       description: Costo total del sector
 *     responses:
 *       201:
 *         description: Caso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso creado exitosamente
 *                 casoID:
 *                   type: integer
 *                   description: ID del caso creado
 *       400:
 *         description: Faltan datos necesarios para crear el caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Faltan datos necesarios para crear el caso
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear el caso
 *                 error:
 *                   type: string
 *                   description: Detalles del error
 */

router.post('/', createCaso);

/**
 * @openapi
 * /api/v1/casos:
 *   get:
 *     tags:
 *       - Casos
 *     summary: Obtener todos los casos junto con sus sectores
 *     responses:
 *       200:
 *         description: Lista de casos con sus sectores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_caso:
 *                     type: integer
 *                     description: ID del caso
 *                   nombre_estado:
 *                     type: string
 *                     description: Estado del caso
 *                   sectores:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ID_sector:
 *                           type: integer
 *                           description: ID del sector
 *                         nombre_sector:
 *                           type: string
 *                           description: Nombre del sector
 *       500:
 *         description: Error al obtener los casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                 error:
 *                   type: string
 *                   description: Detalles del error
 */
router.get('/', getCasos);

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
 *         description: ID del caso que se desea actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_siniestro:
 *                 type: string
 *                 description: Tipo de siniestro
 *               descripcion_siniestro:
 *                 type: string
 *                 description: Descripción del siniestro
 *               ID_Cliente:
 *                 type: integer
 *                 description: ID del cliente
 *               ID_inspector:
 *                 type: integer
 *                 description: ID del inspector
 *               ID_contratista:
 *                 type: integer
 *                 description: ID del contratista
 *               ID_estado:
 *                 type: integer
 *                 description: ID del estado del caso
 *     responses:
 *       200:
 *         description: Caso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso actualizado exitosamente
 *       400:
 *         description: Datos faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Todos los campos son obligatorios y no deben ser null
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al actualizar el caso
 *                 error:
 *                   type: string
 *                   description: Detalles del error
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
 *         description: ID del caso que se desea eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Caso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso eliminado exitosamente
 *       404:
 *         description: Caso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso no encontrado
 */

router.delete('/:id', deleteCaso);

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
 *         description: ID del caso que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Caso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso no encontrado
 */
router.get('/:id', getCasos);

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
 *         description: ID del caso cuyo estado se desea actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_estado:
 *                 type: integer
 *                 description: Nuevo estado del caso
 *     responses:
 *       200:
 *         description: Estado del caso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Estado del caso actualizado exitosamente
 *       404:
 *         description: Caso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Caso no encontrado
 *       400:
 *         description: El estado es obligatorio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: El estado es obligatorio
 */

router.put('/:id/estado', actualizarEstadoCaso);

export default router;