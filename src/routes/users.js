import { Router } from 'express';
import { UserModel } from '../database/models';

const router = Router();

router.route('/')
  // get user
  .get((req, res) => {
    UserModel.find((err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      }

      return res.json({ success: true, data: data });
    });
  })
  // update user
  .patch((req, res) => {
    const { id, update } = req.body;
    UserModel.findByIdAndUpdate(id, update, (err) => {
      if (err) {
        return res.json({ success: false, error: err });
      }

      return res.json({ success: true });
    });
  })
  // add user
  .post((req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.json({
        success: false,
        error: 'INVALID INPUT',
      });
    }

    const user = new UserModel();
    user.name = name;
    user.save((err) => {
      if (err) {
        return res.json({ success: false, error: err });
      }

      return res.json({ success: true });
    });
  })
  // delete user
  .delete((req, res) => {
    const { id } = req.body;
    UserModel.findByIdAndRemove(id, (err) => {
      if (err) {
        return res.send(err);
      }

      return res.json({ success: true });
    });
  });

export default router;
