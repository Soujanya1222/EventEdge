const cron = require("node-cron");
const Ticket = require("../models/ticket-model");
const Event = require("../models/event-model");

cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();

    const pastEvents = await Event.find({
      datetime: { $lt: now }
    }).select("_id");

    if (!pastEvents.length) return;

    const eventIds = pastEvents.map(e => e._id);

    await Ticket.updateMany(
      {
        eventId: { $in: eventIds },
        checkedIn: true,
        status: { $ne: "completed" }
      },
      {
        status: "completed",
        completedAt: now
      }
    );

 
    await Ticket.updateMany(
      {
        eventId: { $in: eventIds },
        checkedIn: false,
        status: "active"
      },
      {
        $set: { status: "missed" }
      }
    );

    console.log("Completed & missed tickets updated");
  } catch (err) {
    console.error("Cron job error", err);
  }
});
