import { Event } from '../models/event.js';

const index = (req, res) => {
	Event.find({ owner: req.user.profile }, (err, foundEvents) => {
		if (err) console.log('Error in events#index:', err);

		if (!foundEvents)
			return res.json({
				message: 'No Events found in database.',
			});

		res.status(200).json({ events: foundEvents });
	});
};

const show = (req, res) => {
	Event.findById(req.params.id, (err, foundEvent) => {
		if (err) {
			console.log('Error in events#show:', err);

			if (!foundEvent)
				return res.json({
					message: 'There is no event with this ID in the db.',
				});

			return res.send('Incomplete event#show controller function');
		}

		res.status(200).json({
			event: foundEvent,
		});
	});
};

const create = (req, res) => {
	console.log('creating', req.body);
	req.body.owner = req.user.profile;
	Event.create(req.body, (err, savedEvent) => {
		if (err) console.log('Error in event#create:', err);

		// Validations and error handling here

		res.status(201).json({ event: savedEvent });
	});
};

const update = (req, res) => {
	Event.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedEvent) => {
			if (err) {
				console.log('Error in event#update:', err);

				return res.send('Incomplete event#update controller function');
			}

			res.status(200).json({
				updatedEvent,
			});
		}
	);
};

const destroy = (req, res) => {
	Event.findByIdAndDelete(req.params.id, (err, deletedEvent) => {
		if (err) {
			console.log('Error in events#destroy:', err);

			return res.send('Incomplete events#destroy controller function');
		}

		res.status(200).json({
			deletedEvent,
		});
	});
};

const createAttendee = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        event.attendeeList.push(req.body)
        await event.save()
        const newAttendee = event.attendeeList[event.attendeeList.length - 1]
        return res.status(201).json(newAttendee)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteAttendee = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		event.attendeeList.remove({ _id: req.params.attendeeId });
		await event.save();
		return res.status(204).end();
	} catch (error) {
		res.status(500).json(error);
	}
};

const updateAttendeeStatus = async (req, res) => {
	try {
		const updatedEvent = await Event.findById(req.params.id);
		const idx = updatedEvent.attendeeList.findIndex(attendee =>
			attendee._id.equals(req.params.attendeeId)
		);
		updatedEvent.attendeeList[idx].status = req.body.status;
        await updatedEvent.save();
        // console.log(updatedEvent);
		return res.status(200).json(updatedEvent.attendeeList[idx]);
	} catch (error) {
		res.status(500).json(error);
	}
};

const addBudgetItem = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        event.budgetItems.push(req.body)
        await event.save()
        const newBudgetItem = event.budgetItems[event.budgetItems.length - 1]
        return res.status(201).json(newBudgetItem)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteBudgetItem = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        event.budgetItems.remove({ _id: req.params.budgetItemId })
        await event.save()
        return res.status(204).end()
    } catch (error) {
        res.status(500).json(error)
    }
}

export {
	index,
	show,
	create,
	update,
	destroy,
	createAttendee,
	deleteAttendee,
    updateAttendeeStatus,
    addBudgetItem,
    deleteBudgetItem,
};
