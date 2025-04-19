import { useEffect, useState } from "react";
import {
  Group,
  Text,
  Box,
  Image,
  Flex,
  Input,
  Center,
  Card,
  Badge,
  Button,
  Loader,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/rooms");
        setRooms(res.data);
        setFilteredRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = rooms.filter((room) =>
      `${room.title} ${room.description} ${room.price}`
        .toLowerCase()
        .includes(query)
    );

    setFilteredRooms(filtered);
  };

  return (
    <Center>
      {" "}
      <Box m={"2rem 14rem 2rem 14rem"}>
        <Flex
          bg={"#ebfcfc"}
          border={"1px solid #dedede"}
          align={"center"}
          style={{
            boxShadow: "5px 5px 5px 4px #f5f5f5",
            borderStartStartRadius: "1rem",
            borderStartEndRadius: "1rem",
          }}
          gap={"16rem"}
        >
          <Box pl={`3rem`}>
            <Text size="2.9rem" fw={700} mb={10}>
              Find Your Perfect Room, Anytime, Anywhere
            </Text>
            <Text c="dimmed" mb={20} size="0.9rem" mt={16}>
              Discover verified listings, flexible leases, and secure payments.
              Renting made easy for everyone!
            </Text>
            <Group style={{ cursor: "pointer" }}>
              <Box
                p={`0.6rem 0.7rem 0.4rem`}
                bg={"#ffffff"}
                style={{
                  borderRadius: "15rem",
                  border: "1px solid #dedede",
                  boxShadow: "0px 0px 3px #aaaaaa",
                }}
              >
                <IconPlayerPlay size={20} color="#008080" fill="#008080" />
              </Box>
              <Text weight={600}>Watch video</Text>
            </Group>
          </Box>
          <Image
            src="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/6/Cyan-Colour-in-Bedroom_0_1200.jpg"
            h={450}
            alt="House"
            style={{ borderStartEndRadius: "1rem" }}
          />
        </Flex>

        {/* Search Input */}
        <Center mt={-35}>
          <Input
            placeholder="Search rooms by location, budget, amenities, and more..."
            value={searchQuery}
            onChange={handleSearch}
            radius="10rem"
            size="md"
            w={"54rem"}
          />
        </Center>

        {/* Room Cards */}
        {loading ? (
          <Center mt={40}>
            <Loader color="teal" />
          </Center>
        ) : (
          <Flex
            justify="space-evenly"
            align="center"
            gap="1.5rem"
            wrap="wrap"
            pt="2rem"
            mt="2rem"
            px="3rem"
          >
            {searchQuery.trim() !== "" ? (
              filteredRooms.length > 0 ? (
                filteredRooms.map((room, index) => (
                  <Card
                    key={index}
                    shadow="sm"
                    padding="lg"
                    component="a"
                    target="_blank"
                    style={{
                      width: "20rem",
                      margin: "10px",
                    }}
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
                      Rs. {room.price}
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
                ))
              ) : (
                <Center>
                  <Text c="dimmed" mt={30}>
                    No rooms found matching your search
                  </Text>
                </Center>
              )
            ) : null}
          </Flex>
        )}
      </Box>
    </Center>
  );
};

export default Bookings;
