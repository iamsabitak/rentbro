import { Group, Button, Text, Flex, Box, Avatar } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import Bookings from "./Booking";
import AboutUs from "./AboutUs";
import Location from "./Location";
import Contact from "./Contact";
import Facilities from "./Facilities";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Navigation = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user information

  useEffect(() => {
    // Simulate checking if user is authenticated (this can be replaced with actual logic)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user if available in localStorage (or from API)
    }
  }, []);

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

  const handleSignOut = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Clear user state
    setIsAuthenticated(false); // Update authentication state
    navigate("/signin"); // Navigate to sign-in page
  };

  return (
    <>
      <Flex p="2rem 0rem 1rem 0rem" justify={"center"} gap={"33rem"}>
        <Group>
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

        {/* Conditional rendering based on user authentication */}
        {user ? (
          <Flex align="center" gap={"1rem"}>
            <Avatar
              src={user?.avatar || "path_to_default_avatar"}
              alt={user?.name || "No Name"}
              radius="xl"
            />
            <Text ml={8} mr={30}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Button
              onClick={handleSignOut}
              variant="filled"
              radius="xl"
              color="#008080"
            >
              Sign Out
            </Button>{" "}
            {/* Add Sign Out button */}
          </Flex>
        ) : (
          <Button
            variant="filled"
            radius="xl"
            color="#008080"
            onClick={() => navigate("/authpage")}
          >
            Sign In
          </Button>
        )}
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
