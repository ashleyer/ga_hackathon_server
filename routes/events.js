import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

router.use(decodeUserFromToken);
router.get('/', checkAuth, eventsCtrl.index);
router.get('/:id', checkAuth, eventsCtrl.show);
router.post('/', checkAuth, eventsCtrl.create);
router.put('/:id', checkAuth, eventsCtrl.update);
router.delete('/:id', checkAuth, eventsCtrl.destroy);

export { router }


