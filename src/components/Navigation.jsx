import { Group, Button, Text, Flex, Box } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import Bookings from "./Booking";
import AboutUs from "./AboutUs";
import Location from "./Location";
import Contact from "./Contact";
import Facilities from "./Facilities";

const Navigation = () => {
  const { scrollIntoView: scrollIntoAboutUs, targetRef: targetRefAboutUs } =
    useScrollIntoView({ offset: 60 });
  const { scrollIntoView: scrollIntoBooking, targetRef: targetRefBooking } =
    useScrollIntoView({ offset: 60 });
  const {
    scrollIntoView: scrollIntoFacilities,
    targetRef: targetRefFacilities,
  } = useScrollIntoView({ offset: 60 });
  const { scrollIntoView: scrollIntoLocation, targetRef: targetRefLocation } =
    useScrollIntoView({ offset: 60 });
  const { scrollIntoView: scrollIntoContact, targetRef: targetRefContact } =
    useScrollIntoView({ offset: 60 });
  return (
    <>
      {" "}
      <Flex p={24} justify={"right"} gap={"18rem"}>
        <Group gap={40}>
          <Text
            size="lg"
            weight={700}
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => scrollIntoBooking({ alignment: "center" })}
          >
            Booking
          </Text>
          <Text
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
            size="lg"
            onClick={() => scrollIntoFacilities({ alignment: "center" })}
          >
            Facilities
          </Text>
          <Text
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
            size="lg"
            onClick={() => scrollIntoAboutUs({ alignment: "center" })}
          >
            About Us
          </Text>
          <Text
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
            size="lg"
            onClick={() => scrollIntoLocation({ alignment: "start" })}
          >
            Location
          </Text>
          <Text
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
            size="lg"
            onClick={() => scrollIntoContact({ alignment: "center" })}
          >
            Contact
          </Text>
        </Group>
        <Button variant="filled" radius="xl" color="#008080" mr={"4rem"}>
          Login
        </Button>
      </Flex>
      <Box ref={targetRefBooking}>
        <Bookings />
      </Box>
      <Box ref={targetRefFacilities}>
        <Facilities />
      </Box>
      <Box ref={targetRefAboutUs}>
        <AboutUs />{" "}
      </Box>
      <Box ref={targetRefLocation}>
        <Location />
      </Box>
      <Box ref={targetRefContact}>
        <Contact />
      </Box>
    </>
  );
};

export default Navigation;
