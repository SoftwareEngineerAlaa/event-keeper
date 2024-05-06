const event = require("../model/event");
const Event = require("../model/event");
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); 
    res.header("Content-type", "application/json");
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
exports.addEvent = async (req, res) => {
  try {
    const { title, date, venue } = req.body;
    if (!title || !date || !venue) {
      res.sendStatus(400);
      return;
    }
    const newEvent = await Event.create({ title, date, venue });
    res.status(201).json(newEvent);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      console.log('🗑️ Event not found');
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log('🗑️ Event deleted successfully');
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};