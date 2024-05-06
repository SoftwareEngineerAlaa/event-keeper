import React from "react";

function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatEventDate(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const eventDate = new Date(date);
  return `${formattedHours}:${formattedMinutes} ${ampm} - ${date.toLocaleDateString(
    "en-US",
    {
      month: "long",
    }
  )} ${getDayWithSuffix(eventDate.getDate())} ${date.toLocaleDateString(
    "en-US",
    { year: "numeric" }
  )}`;
}

function Event({ title, date, venue, isFirst, deleteEvent, _id }) {
  const eventDate = new Date(date);
  const formattedDate = `${getDayWithSuffix(
    eventDate.getDate()
  )} ${eventDate.toLocaleDateString("en-US", { month: "short" })}`;

  return (
    <div className="event-bar">
      <div className="date-cyan">
        <p>{formattedDate}</p>
      </div>
      <div className={`event ${isFirst ? "next-event" : "event-bar-info"}`}>
        <h2>{title}</h2>
        <div className="details">
          <p>{formatEventDate(new Date(date))}</p>
          <p>{venue}</p>
        </div>
      </div>
      <div className="trash">
        <p
          className="trash-icon"
          onClick={() => {
            deleteEvent(_id);
          }}
        >
          🗑️
        </p>
      </div>
    </div>
  );
}

export default Event;
