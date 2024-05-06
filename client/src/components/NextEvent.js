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
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const eventDate = new Date(date);
  return `${formattedHours}:${formattedMinutes} ${ampm} - ${date.toLocaleDateString('en-US', {
    month: 'long'})} ${getDayWithSuffix(eventDate.getDate())} ${date.toLocaleDateString('en-US', {year: 'numeric'})}`;
}

function NextEvent({ nextEvent }) {
  if (!nextEvent) {
    return (
      <div className="no-events">
        <h1>🏖️</h1>
        <h3>No upcoming events</h3>
        <h1>😴</h1>
      </div>
    );
  }

  const eventDate = new Date(nextEvent.date);
  const formattedDate = `${eventDate.toLocaleDateString('en-US', { month: 'short' })} ${getDayWithSuffix(eventDate.getDate())}`;

  return (
    <div className="nextEvent">
      <div className="coming-event">
        <h4>NEXT EVENT</h4>
      </div>
      <div className="next-event-info">
        <h2 className="date">{formattedDate}</h2>
        <p className="event-title">{nextEvent.title}</p>
        <p>{formatEventDate(new Date(nextEvent.date))}</p>
        <p>{nextEvent.venue}</p>
      </div>
    </div>
  );
}

export default NextEvent;
