import {useRouteLoaderData } from "react-router-dom";
import EventForm from '../components/EventForm';

const EditEventPage = () => {
  const data = useRouteLoaderData('event-detail');
  return (
      <EventForm method='patch' event={data.event}/>
    // <>
    //   <h1>Edit Event Page</h1>
    //     <p>Event Id : {params.eventId}</p> 
    // </>
  );
};

export default EditEventPage;
