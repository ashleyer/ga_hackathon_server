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

router.post('/:id/attendees', checkAuth, eventsCtrl.createAttendee)
router.delete('/:id/attendees/:attendeeId', checkAuth, eventsCtrl.deleteAttendee)
router.patch('/:id/attendees/:attendeeId', checkAuth, eventsCtrl.updateAttendeeStatus)

router.post('/:id/budget', checkAuth, eventsCtrl.addBudgetItem)
router.delete('/:id/budget/:budgetItemId', checkAuth, eventsCtrl.deleteBudgetItem)

export { router }


