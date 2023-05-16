import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import RootPage from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';

const router = createBrowserRouter([
  {
    path: "/", element: <RootPage />, children: [
      { index: true, element: <HomePage /> },
      {
        path: "events", element: <EventsRootLayout />, children: [
          {
            index: true, element: <EventsPage />, loader: eventsLoader
          },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventsId/edit", element: <EditEventPage /> },
        ]
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
