import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import * as Bcrypt from '../../util/Bcrypt';
import { redisConnection } from '../../util/Redis';
const path = '/default';
const router = Router();

router.get('/', (req, res) => {
  res.send('accessed confirm facebook: /Paperlion1');
});

// router.get('/redisGet/:data', (req, res) => {
//   redisConnection.get(req.params.data, (err, data) => {
//     if (err) {
//       res.send(err)
//     }
//     res.send({ data: data })
//   });
// });

// router.get('/redisSet', (req, res) => {
//   redisConnection.set(req.query.key, req.query.value, (result) => {
//     res.send(result)
//   })
// });

// router.get('/redisGetAllKey', (req, res) => {
//   redisConnection.keys('*', (err, data) => {
//     if (err) {
//       res.send(err)
//     }
//     res.send(data)
//   })
// });

router.get('/tokenCheck', jwtFilter, controllerHandler((req, res, next) => {
  res.send(req.tokenDecoded)
}))

router.get('/genBcrypt', controllerHandler(async (req, res, next) => {
  let data = req.query.data
  let hashed = await Bcrypt.hash(data);
  res.send({
    data: data,
    hash: hashed
  })
}))

export default { path, router };
