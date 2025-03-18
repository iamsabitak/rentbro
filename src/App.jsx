import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import Hero from "./components/Hero";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <MantineProvider>
      <Navigation />
      <Hero />
    </MantineProvider>
  );
};

export default App;
