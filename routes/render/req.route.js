const router = require('express').Router();
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../../middleware/auth');
const Registration = require('../../views/Registration');
const { User } = require('../../db/models');

router.route('/')
  .get(sessionChecker, (req, res) => {
    res.renderComponent(Registration);
  })
  .post(async (req, res) => {
    const { username, email, password } = req.body;

    // получение пользователя из БД для дальнейшей проверки
    const userInDb = await User.findOne({ where: { email } });

    if (userInDb) {
      res.status(403).json({ registration: false, message: 'This email is already in use' });
    } else {
      try {
        const user = new User({
          username,
          email,
          password: await bcrypt.hash(password, 10),
        });
        // дожидаемся асинхронного сохранения ресурса в базе
        await user.save();

        // наполнение сессии ID зарегистрированного пользователя
        req.session.userId = user.id;
        res.status(201).json({ registration: true, url: '/dashboard' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  });

module.exports = router;
