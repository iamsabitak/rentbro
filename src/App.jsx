import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import Navigation from "./components/Navigation";
import Facilitites from "./components/Facilities";
import Bookings from "./components/Booking";
import AboutUs from "./components/AboutUs";

const App = () => {
  return (
    <MantineProvider>
      <Navigation />
      <Bookings />
      <Facilitites />
      <AboutUs />
    </MantineProvider>
  );
};

export default App;
