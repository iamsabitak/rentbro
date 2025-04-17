import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Text, Image, Badge, Loader, Center, Button } from "@mantine/core";
import axios from "axios";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Room not found", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <Center mt={40}>
        <Loader color="teal" />
      </Center>
    );
  }

  if (!room) {
    return (
      <Center mt={40}>
        <Text c="red">Room not found!</Text>
      </Center>
    );
  }

  return (
    <Box p="2rem">
      <Image src={room.image} height={300} alt={room.title} radius="md" mb="1.5rem" />

      <Text size="2rem" fw={700} mb="0.5rem">{room.title}</Text>
      <Text c="dimmed" mb="1rem">{room.description}</Text>

      <Badge color="#008080" size="lg" mb="1rem">
        Rs. {room.price}
      </Badge>

      <Text fw={600}>More details coming soon...</Text>

      <Button mt="2rem" variant="outline" color="teal" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </Box>
  );
};

export default RoomDetail;
