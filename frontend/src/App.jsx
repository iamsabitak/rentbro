import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import Navigation from "./components/Navigation";

const App = () => {
  return (
    <MantineProvider>
      <Navigation />
    </MantineProvider>
  );
};

export default App;
