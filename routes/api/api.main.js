const router = require('express').Router();
const { User } = require('../../db/models');

router.route('/users')
  .get(async (req, res) => {
    try {
      const users = await User.findAll({ raw: true });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.messge });
    }
  })
  .post(async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.messge });
    }
  });

router.route('/users/:id')
  .put(async (req, res) => {
    const { id } = req.params;
    try {
      const updateUser = await User.update(req.body, { where: { id: Number(id) }, raw: true, returning: true });
      const [, [user]] = updateUser;
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUSer = await User.destroy({ where: { id } });
      deletedUSer ? res.json({ deleted: true, id }) : res.status(404).json({ deleted: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
