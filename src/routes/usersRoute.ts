import { Router, Request, Response } from 'express';
import * as userController from '../controllers/userController';

export const usersRouter = Router();

// user signup
usersRouter.post('/', userController.createUser);

// user login
// usersRouter.post('/login', userController.login);

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
