import React from "react";
import Event from "./Event";

function EventsList({ events, deleteEvent }) {
  return (
    <div className="eventsList" id="list">
      {events.map((event) => (
        <Event key={event._id} {...event} deleteEvent={deleteEvent} />
      ))}
    </div>
  );
}

export default EventsList;