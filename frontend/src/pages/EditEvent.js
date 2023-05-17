import React from 'react'
import EventForm from '../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';

const EditEventPage = () => {

  const data = useRouteLoaderData('event-detail');

  console.log(data);
  return (
    <EventForm event={data.eventDetail} method="patch" />
  )
}

export default EditEventPage;