const Review=require('../models/review-model')
const Event =require('../models/event-model')
const reviewCltr={}
reviewCltr.create = async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;

    if (req.role !== "attendee") {
      return res.status(403).json({ error: "Only attendees can review events" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

 
    const alreadyReviewed = await Review.findOne({
      attendeeId: req.userId,
      eventId
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        error: "You have already reviewed this event"
      });
    }

    const review = await Review.create({
      eventId,
      attendeeId: req.userId,
      rating,
      comment
    });

    const populated = await Review.findById(review._id)
      .populate("eventId", ["title"])
      .populate("attendeeId", ["name"]);

    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

reviewCltr.listByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const reviews = await Review.find({ eventId })
      .populate("attendeeId", ["name", "_id"])
      .populate("eventId", ["title", "organiserId"]);

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

reviewCltr.getOne = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("eventId", ["title"])
      .populate("attendeeId", ["name"]);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

reviewCltr.update = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.attendeeId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

reviewCltr.remove = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.attendeeId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
reviewCltr.listForOrganiser = async (req, res) => {
  try {
    const organiserId = req.user?.id || req.userId;

    if (!organiserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const reviews = await Review.find()
      .populate({
        path: "eventId",
        match: { organiserId },
        select: ["title", "organiserId"],
      })
      .populate("attendeeId", ["name"]);

    const filteredReviews = reviews.filter(
      (review) => review.eventId !== null
    );

    res.status(200).json(filteredReviews);
  } catch (err) {
    console.error("Organiser review error:", err);
    res.status(500).json({ error: "Failed to load organiser reviews" });
  }
};






module.exports=reviewCltr