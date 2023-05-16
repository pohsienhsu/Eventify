import React from 'react';
import EventItem from '../components/EventItem';

import { useLoaderData, useParams, json } from 'react-router-dom';

const EventDetailPage = () => {
  const data = useLoaderData();

  return (
    <>
      <EventItem event={data.event}/>
    </>
  )
}

export default EventDetailPage;

export const loader = async ({request, params}) => {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw json({message: 'Could not fetch details for selected event'}, {status: 500})
  }

  return response;
}