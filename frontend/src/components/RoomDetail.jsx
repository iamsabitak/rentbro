import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Badge,
  Loader,
  Center,
  Button,
  Modal,
  Group,
  Paper,
} from "@mantine/core";
import axios from "axios";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState(false); // Modal state for booking confirmation

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

  const handleBooking = () => {
    // Trigger room booking logic (API call or show booking details)
    console.log(`Booking room with ID: ${id}`);
    setBookingModal(true); // Open booking confirmation modal
  };

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
    <Center>
      <Box p="2rem" style={{ maxWidth: "800px", width: "100%" }}>
        <Image
          src={room.image}
          height={500}
          w={"100%"}
          alt={room.title}
          radius="md"
          mb="1.5rem"
          style={{ objectFit: "cover" }}
        />

        <Text size="2rem" fw={700} mb="0.5rem" c="dark" align="center">
          {room.title}
        </Text>

        <Text c="dimmed" mb="1rem" align="center">
          {room.description}
        </Text>

        <Badge color="#008080" size="lg" mb="1rem" align="center">
          Rs. {room.price}
        </Badge>

        <Group position="apart" mb="1.5rem" align="center">
          <Text fw={600} c="gray">
            More details coming soon...
          </Text>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "#008080", deg: 60 }}
            onClick={handleBooking}
          >
            Book Room
          </Button>
        </Group>

        {/* Booking Confirmation Modal */}
        <Modal
          opened={bookingModal}
          onClose={() => setBookingModal(false)}
          title="Booking Confirmation"
          centered
        >
          <Paper p="md" shadow="sm">
            <Text size="lg">
              You have successfully booked the room:{" "}
              <strong>{room.title}</strong>
            </Text>
            <Text c="dimmed">
              Your booking details will be sent to your email.
            </Text>
            <Group position="right" mt="md">
              <Button
                variant="outline"
                color="#008080"
                onClick={() => setBookingModal(false)}
              >
                Close
              </Button>
            </Group>
          </Paper>
        </Modal>

        <Button
          variant="outline"
          mt="2rem"
          color="#008080"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </Box>
    </Center>
  );
};

export default RoomDetail;
