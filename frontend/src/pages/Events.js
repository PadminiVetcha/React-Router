// // import { Link } from "react-router-dom";

// // const DUMMY_EVENTS = [
// //   { id: "e1", title: "Event-1" },
// //   { id: "e2", title: "Event-2" },
// //   { id: "e3", title: "Event-3" },
// //   { id: "e4", title: "Event-4" },
// //   { id: "e5", title: "Event-5" },
// // ];

// // const EventsPage = () => {
// //   return (
// //     <>
// //       <h1>Events Page</h1>
// //       <ul>
// //         {DUMMY_EVENTS.map((event) => (
// //           <li key={event.id}>
// //             <Link to={`/events/${event.id}`}>{event.title}</Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </>
// //   );
// // };

// // export default EventsPage;

// import { useEffect, useState } from 'react';

// import EventsList from '../components/EventsList';

// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       //***************/ added this code as a function to loader property in App.js ****************** //
//       // const response = await fetch('http://localhost:8080/events');

//       // if (!response.ok) {
//       //   setError('Fetching events failed.');
//       // } else {
//       //   const resData = await response.json();
//       //   setFetchedEvents(resData.events);
//       // }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

// export default EventsPage;

import EventsList from "../components/EventsList";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

const EventsPage = () => {
  //We use the hook useLoaderdata to provide the value returned from route loader.

  //We can comment the hook here and use in EventsList component directly. In such case we need to remove the
  //events paramter from the function as we no need to await for it and declare the useLoaderData hook
  const data = useLoaderData();
  //used if defer function isn't used
  const events = data.events;
  if (data.isError) {
    return <p>{data.message}</p>;
  }
  return <EventsList events={events} />;

  //if defer function is used then -
  // const { events } = useLoaderData();
  // return (
  //   <Suspense fallback={<p style={{textAlign: 'center'}}>Loading..</p>}>
  //     <Await resolve={events}>
  //       {(loadedEvents) => <EventsList events={loadedEvents} />}
  //     </Await>
  //   </Suspense>
  // );
};

// export default EventsPage;

// async function loadEvents() {
//   const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     //We can either return the obj with error message here or also throw an error here
//     //return {isError: true, message: 'Could not fetch events.'}; or
//     //throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
//     //status: 500,});
//     // as an alternative of above throw new Response, we can use json function
//     throw json(
//       { message: "Could not fetch events" },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     //we can also directly return the response object and to get events for that we can
//     // use useLoaderData()'s variable.events as we need it's value as a prop of EventsList or
//     //const resData = await response.json();
//     //return resData.events;
//     //return response;
//     const resData = await response.json();
//     return resData.events
//   }
// }

export async function loader() {
  //defer is a function used when you want to load some part of page without waiting for the remaining
  //data being resulted as a db call
  // return defer({
  //   event: loadEvents(),
  // });


  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //We can either return the obj with error message here or also throw an error here
    //return {isError: true, message: 'Could not fetch events.'}; or
    //throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //status: 500,});
    // as an alternative of above throw new Response, we can use json function
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    //we can also directly return the response object and to get events for that we can
    // use useLoaderData()'s variable.events as we need it's value as a prop of EventsList or
    //const resData = await response.json();
    //return resData.events;
    return response;
    // const resData = await response.json();
    // return resData.events
  }
}

export default EventsPage;