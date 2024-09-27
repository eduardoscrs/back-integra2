import { pool } from "../config/db.js";

export const getUsers = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const users = await conn.query('SELECT * FROM USUARIOS');
        res.json(users[0]);
    } catch (error) {
        console.log("algo salio mal");
        res.status(500).json({ error: error.message });
    }
}

export const registerUser = async (req, res) => {
    try {
        const { nombre, usuario, correo, idrol} = req.body;
        const newUser = { nombre, usuario, correo, idrol};
        const conn = await pool.getConnection();
        conn.query('INSERT INTO USUARIOS SET ?', [newUser]);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const editUser = async (req, res) => {
    try {
        const { nombre, usuario, correo, idrol } = req.body;
        const id = req.params.id;
        const conn = await pool.getConnection();
        conn.query('UPDATE USUARIOS SET nombre = ?, usuario = ?,\
            correo = ?, idrol = ? WHERE id = ?', [nombre, usuario, correo, idrol, id]);
        res.json({ nombre, usuario, correo, idrol});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const conn = await pool.getConnection();
        conn.query('DELETE FROM USUARIOS WHERE id = ?', [id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}