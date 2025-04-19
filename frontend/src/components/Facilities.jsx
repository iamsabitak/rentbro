import {
  Box,
  Button,
  Flex,
  Card,
  Image,
  Text,
  Badge,
  Center,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Facilitites = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setRoomData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Center m={"0rem 5rem 6rem 9rem"} display={"block"}>
      <Box>
        <Text size="2.9rem" fw={700} mb={10} ml={"3.9rem"}>
          Our Most Popular Rooms
        </Text>
        <Flex justify={"space-evenly"} align={"center"} gap={"30rem"}>
          <Text c="dimmed" mb={20} size="0.9rem">
            Discover the most sought-after rooms chosen by renters for their
            comfort, convenience, and value.
          </Text>
          <Button
            variant="filled"
            radius="xl"
            color="rgb(181, 235, 223)"
            mr={"4rem"}
            mt={"-1rem"}
            styles={{ label: { color: "#008080" } }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        </Flex>
      </Box>
      <Flex
        justify={"space-evenly"}
        align={"center"}
        gap={"0.7rem"}
        wrap="wrap" // Allows wrapping of cards into multiple rows
        pt={"4rem"}
        ml={"-3rem"}
      >
        {roomData.slice(0, showAll ? roomData.length : 3).map((room, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            component="a"
            target="_blank"
            style={{ width: "20rem", marginBottom: "20px" }} // Adds margin to cards
          >
            <Card.Section>
              <Image src={room.image} h={160} alt={room.title} />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              {room.title}
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              {room.description}
            </Text>

            <Badge color="#008080" mt="md">
              {room.price}
            </Badge>

            <Button
              variant="filled"
              color="#008080"
              radius="md"
              mt="md"
              onClick={() => navigate(`/rooms/${room.id}`)}
            >
              View Detail
            </Button>
          </Card>
        ))}
      </Flex>
    </Center>
  );
};

export default Facilitites;
