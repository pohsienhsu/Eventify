import React, { Suspense } from 'react';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

import { useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';

const EventDetailPage = () => {
  const { eventDetail, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}} >Loading</p>}>
        <Await resolve={eventDetail}>
          {(event) => <EventItem event={event} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}} >Loading</p>}>
        <Await resolve={events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage;

const loadEventDetail = async (params) => {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event' }, { status: 500 })
  }

  const data = await response.json();
  return data.event;
}

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {isError: true, message: "Could not fetch data"};
    // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {status: 500})
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export const loader = async ({ request, params }) => {
  return defer({
    eventDetail: await loadEventDetail(params),
    events: loadEvents()
  })
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}