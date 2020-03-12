const express = require('express');
const router = express.Router();

// Schema subscribers
const Subscriber = require('../models/subscriber');

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.send(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id',getSubscriber, (req, res) => {
    res.json(res.subscriber);
    // res.send(JSON.stringify(req.params) +'<br> '+  req.params.id)
})

// Creatine one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber) // 201 always to specify that we added something)
    } catch (err) {
        res.status(400).json({ message: err.message }) // 400 something wrong with user input not with your server
    }
})
// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscriberToChannel != null) {
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting  one 
router.delete('/:id', getSubscriber,async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'Delete Subscriber'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        console.log('find id:' + req.params.id)
        if(subscriber == null) {
        return res.status(404).json({ message: "Cannot find subscriber"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    console.log('subscriber: ' + subscriber)
    next();
}

module.exports = router;