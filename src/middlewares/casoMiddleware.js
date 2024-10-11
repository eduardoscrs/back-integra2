// middlewares/casoValidation.js
import { body, param } from 'express-validator';

export const validateCasoCreation = [
  body('tipo_siniestro')
    .notEmpty()
    .withMessage('El tipo de siniestro es obligatorio.'),
  body('descripcion_siniestro')
    .notEmpty()
    .withMessage('La descripción del siniestro es obligatoria.'),
  body('ID_Cliente')
    .isInt()
    .withMessage('El ID del cliente debe ser un número entero.'),
  body('ID_inspector')
    .isInt()
    .withMessage('El ID del inspector debe ser un número entero.'),
  body('ID_contratista')
    .isInt()
    .withMessage('El ID del contratista debe ser un número entero.'),
  body('ID_estado')
    .isInt()
    .withMessage('El ID del estado debe ser un número entero.'),
  body('sectores').isArray().withMessage('Los sectores deben ser un arreglo.'),
];

export const validateCasoUpdate = [
  param('id').isInt().withMessage('El ID del caso debe ser un número entero.'),
  body('tipo_siniestro')
    .notEmpty()
    .withMessage('El tipo de siniestro es obligatorio.'),
  body('descripcion_siniestro')
    .notEmpty()
    .withMessage('La descripción del siniestro es obligatoria.'),
  body('ID_Cliente')
    .isInt()
    .withMessage('El ID del cliente debe ser un número entero.'),
  body('ID_inspector')
    .isInt()
    .withMessage('El ID del inspector debe ser un número entero.'),
  body('ID_contratista')
    .isInt()
    .withMessage('El ID del contratista debe ser un número entero.'),
  body('ID_estado')
    .isInt()
    .withMessage('El ID del estado debe ser un número entero.'),
];
