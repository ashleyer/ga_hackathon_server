const db = require('../models');

const index = (req, res) => {
    db.Event.find({}, (err, foundEvents) => {
        if (err) console.log('Error in events#index:', err)

        if (!foundEvents) return res.json({
            message: 'No Events found in database.'
        })

        res.status(200).json({ events: foundEvents });
    })
}

const show = (req, res) => {
    db.Event.findById(req.params.id, (err, foundEvent) => {
        if (err) {
            console.log('Error in events#show:', err);

            if (!foundEvent) return res.json({
                message: 'There is no event with this ID in the db.'
            })

            return res.send("Incomplete event#show controller function");
        }

        res.status(200).json({
            event: foundEvent
        });
    });
};

const create = (req, res) => {
    console.log('creating', req.body);
    db.Event.create(req.body, (err, savedEvent) => {
        if (err) console.log('Error in event#create:', err)

        // Validations and error handling here

        res.status(201).json({ event: savedEvent })
    })
}

const update = (req, res) => {
    db.Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEvent) => {
        if (err) {
            console.log('Error in event#update:', err)

            return res.send("Incomplete event#update controller function");
        }

        res.status(200).json({
            updatedEvent
        });
    });
};

const destroy = (req, res) => {
    db.Event.findByIdAndDelete(req.params.id, (err, deletedEvents) => {
        if (err) {
            console.log('Error in events#destroy:', err)

            return res.send("Incomplete events#destroy controller function");
        }

        res.status(200).json(
            {
                deletedEvent
            }
        );
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
