const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT employeeId, name, department, project, status, designation, type
      FROM employees
    `);
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch employees:', err.message);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});
router.get('/:id/photo', async (req, res) => {
  try {
   
    const [rows] = await db.query(
      'SELECT profile_photo FROM employees WHERE employeeId = ?',
      [req.params.id]
    );

    if (!rows.length || !rows[0].profile_photo) return res.sendStatus(404);

    res.set('Content-Type', 'image/jpeg');
    res.send(rows[0].profile_photo);
  } catch (err) {
    console.error('Failed to load profile photo:', err.message);
    res.status(500).json({ error: 'Failed to load photo' });
  }
});

router.post('/', upload.single('profile_photo'), async (req, res) => {
  const { name, department, project, status, employeeId, designation, type } = req.body;
  const photoBuffer = req.file ? req.file.buffer : null;

  try {
    await db.query(
      'INSERT INTO employees (name, department, project, status, employeeId, designation, type, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, department, project, status, employeeId, designation, type, photoBuffer]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error('Insert error:', err.message);
    res.status(500).json({ error: 'Insert failed' });
  }
});

router.put('/:id', upload.single('profile_photo'), async (req, res) => {
  const { name, department, project, status, designation, type, employeeId } = req.body;
  const photoBuffer = req.file ? req.file.buffer : null;

  console.log("🛠️ UPDATE called for employeeId:", employeeId);
  console.log("Request Body:", req.body);
  console.log("Photo included:", !!photoBuffer);

  try {
    let query, params;

    if (photoBuffer) {
      query = `
        UPDATE employees
        SET name = ?, department = ?, project = ?, status = ?, designation = ?, type = ?, profile_photo = ?
        WHERE employeeId = ?
      `;
      params = [name, department, project, status, designation, type, photoBuffer, employeeId];
    } else {
      query = `
        UPDATE employees
        SET name = ?, department = ?, project = ?, status = ?, designation = ?, type = ?
        WHERE employeeId = ?
      `;
      params = [name, department, project, status, designation, type, employeeId];
    }

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ error: 'Update failed' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'DELETE FROM employees WHERE employeeId = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
