import { Router } from 'express';
import { UserModel } from '../database/models';

const router = Router();

// user signup
router.post('/', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      error: "Invalid Body",
    });
  }

  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  // insert user into db
  UserModel.create(userData, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.json({
      success: true,
      user: { email: user.email },
    });
  });
});

// user login
router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      error: "Invalid Body",
    });
  }

  const user = {
    email: req.body.email,
    password: req.body.password
  };

  UserModel.findOne(user, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else if (!data) {
      return res.status(401).json({
        success: false,
        error: "User not found"
      });
    }

    return res.json({ success: true, data: data });
  });
});
// // update user
// .patch((req, res) => {
//   const { id, update } = req.body;
//   UserModel.findByIdAndUpdate(id, update, (err) => {
//     if (err) {
//       return res.json({ success: false, error: err });
//     }

//     return res.json({ success: true });
//   });
// })
// // delete user
// .delete((req, res) => {
//   const { id } = req.body;
//   UserModel.findByIdAndRemove(id, (err) => {
//     if (err) {
//       return res.send(err);
//     }

//     return res.json({ success: true });
//   });
// });

export default router;
