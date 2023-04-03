import { Outlet } from "react-router-dom";
import EventsNavigation from '../components/EventsNavigation'

const EventsRootlayout = () => {
    return <>
    <EventsNavigation/>
    <main>
        <Outlet/>
    </main>
    </>;
};

export default EventsRootlayout;