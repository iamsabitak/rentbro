import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Facilities from "./components/hotelfacilities/facilities";
import PopularRoom from "./components/hotelfacilities/PopularRoom";

const App = () => {
  return (
    <MantineProvider>
      <Navigation />
      <Hero />
      <PopularRoom />
      <Facilities />
    </MantineProvider>
  );
};

export default App;
