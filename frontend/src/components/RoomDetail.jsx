import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Text,
  Image,
  Loader,
  Center,
  Button,
  Modal,
  Group,
  Paper,
  Grid,
  Stack,
  ThemeIcon,
  Divider,
  Badge,
  Container,
  Title,
  SimpleGrid,
  AspectRatio,
  Rating,
  Box,
  useMantineTheme, // Import the theme hook
} from "@mantine/core";
import {
  IconWalk,
  IconMapPin,
  IconCheck,
  IconWifi,
  IconCoffee,
  IconBed,
  IconCar,
  IconSwimming,
  IconWashMachine,
  IconSnowflake,
  IconBarbell,
  IconClock,
  IconCalendar,
  IconUsers,
  IconRuler,
  IconStarFilled, // Don't forget to import this for consistent rating icons
} from "@tabler/icons-react";
import axios from "axios";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState(false);
  const [advanceModal, setAdvanceModal] = useState(false);
  const theme = useMantineTheme(); // Use the theme

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
    console.log(`Booking room with ID: ${id}`);
    setBookingModal(true);
  };

  const handleAdvanceBooking = () => {
    console.log(`Advance booking for room ID: ${id}`);
    setAdvanceModal(true);
  };

  if (loading) {
    return (
      <Center style={{ height: "80vh" }}>
        <Loader color="teal" size="xl" variant="bars" />
      </Center>
    );
  }

  if (!room) {
    return (
      <Center style={{ height: "80vh" }}>
        <Text size="xl" fw={700} c="red">
          Room not found!
        </Text>
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Paper
        radius="lg"
        shadow="md" // Slightly stronger shadow
        withBorder
        styles={{
          overflow: "hidden",
          borderColor: theme.colors.gray[2],
        }} // Use theme for border color
      >
        <Grid gutter={0}>
          {/* Left Column - Images and Amenities */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={room.image}
                alt={room.title}
                radius="lg"
                style={{
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  transition: "transform 0.2s ease-in-out", // Smooth hover
                  "&:hover": { transform: "scale(1.02)" },
                }}
              />
            </AspectRatio>
            <Paper p="xl" mt="1rem" shadow="none" radius="lg">
              <Title order={3} pb="sm" c={theme.colors.blue[7]}>
                Amenities
              </Title>
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="lg" pt="md">
                {[
                  {
                    icon: <IconWifi size={20} />,
                    label: "Guest WiFi Provided",
                  },
                  {
                    icon: <IconCoffee size={20} />,
                    label: "Breakfast Included",
                  },
                  {
                    icon: <IconBed size={20} />,
                    label: "Room Service Available",
                  },
                  {
                    icon: <IconCar size={20} />,
                    label: "Free On-site Parking",
                  },
                  {
                    icon: <IconSwimming size={20} />,
                    label: "Swimming Pool Access",
                  },
                  { icon: <IconBarbell size={20} />, label: "Fitness Center" },
                  {
                    icon: <IconWashMachine size={20} />,
                    label: "Laundry Service",
                  },
                  {
                    icon: <IconSnowflake size={20} />,
                    label: "Air Conditioning",
                  },
                ].map((amenity, index) => (
                  <Group key={index} spacing="xs" align="center">
                    <ThemeIcon
                      color="teal"
                      variant="light"
                      size="sm"
                      radius="md"
                    >
                      {amenity.icon}
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">
                      {amenity.label}
                    </Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Paper>
          </Grid.Col>

          {/* Right Column - Details */}
          <Grid.Col span={{ base: 12, md: 5 }} p="xl">
            <Stack spacing="lg">
              <Box>
                <Title order={2} fw={700} mb="xs" c={theme.colors.dark[9]}>
                  {room.title}
                </Title>

                <Group spacing="xs" mb="sm">
                  <Rating
                    value={4.3}
                    fractions={2}
                    readOnly
                    size="sm"
                    color="yellow"
                    icon={<IconStarFilled size={16} />}
                  />
                  <Text fw={500} c="dimmed" size="sm">
                    4.3{" "}
                    <Text span c={theme.colors.gray[5]}>
                      (1,642 reviews)
                    </Text>
                  </Text>
                </Group>

                <Group spacing="xl" mb="md">
                  <Group spacing={4}>
                    <ThemeIcon
                      color="blue"
                      variant="light"
                      size="sm"
                      radius="xl"
                    >
                      <IconUsers size={16} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">
                      {room.capacity || "2"} guests
                    </Text>
                  </Group>
                  <Group spacing={4}>
                    <ThemeIcon
                      color="orange"
                      variant="light"
                      size="sm"
                      radius="xl"
                    >
                      <IconRuler size={16} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">
                      {room.size || "35"} m²
                    </Text>
                  </Group>
                  <Group spacing={4}>
                    <ThemeIcon
                      color="violet"
                      variant="light"
                      size="sm"
                      radius="xl"
                    >
                      <IconBed size={16} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">
                      {room.beds || "1 Queen bed"}
                    </Text>
                  </Group>
                </Group>
              </Box>

              <Divider my="sm" variant="dashed" />

              <Box>
                <Title order={4} mb="sm" c={theme.colors.blue[7]}>
                  Description
                </Title>
                <Text c="dimmed" styles={{ lineHeight: 1.6 }}>
                  {room.description ||
                    "This beautifully appointed room features contemporary decor with all the modern amenities you need for a comfortable stay. Enjoy premium bedding, a spacious work area, and stunning views."}
                </Text>
              </Box>

              <Divider my="sm" variant="dashed" />

              <Box>
                <Title order={4} mb="sm" c={theme.colors.blue[7]}>
                  Location
                </Title>
                <Group spacing="xs" mb={4}>
                  <ThemeIcon color="red" variant="light" size="sm" radius="xl">
                    <IconMapPin size={16} />
                  </ThemeIcon>
                  <Text c="dimmed">
                    {room.location || "Whitcomb St, Trafalgar Square, London"}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed" pl={30}>
                  <IconWalk size={14} style={{ marginRight: 6 }} />2 min walk to
                  nearest subway station
                </Text>
              </Box>

              <Divider my="sm" variant="dashed" />

              <Box>
                <Title order={4} mb="sm" c={theme.colors.blue[7]}>
                  Pricing
                </Title>
                <Group position="apart" align="center">
                  <Box>
                    <Text size="xl" fw={700} c={theme.colors.teal[7]}>
                      €{room.price || "120"}
                    </Text>
                    <Text size="sm" c="dimmed">
                      per night (includes taxes)
                    </Text>
                  </Box>
                  <Badge
                    c={theme.colors.teal[7]}
                    variant="light"
                    size="lg"
                    radius="sm"
                  >
                    Free cancellation
                  </Badge>
                </Group>
              </Box>

              <Group grow mt="lg" spacing="md">
                <Button
                  size="md"
                  radius="md"
                  color="#008080"
                  onClick={handleBooking}
                  styles={{ fontWeight: 600 }}
                >
                  Book Now
                </Button>
                <Button
                  size="md"
                  radius="md"
                  variant="outline"
                  color="#008080"
                  leftIcon={<IconCalendar size={18} />}
                  onClick={handleAdvanceBooking}
                  styles={{ fontWeight: 600 }}
                >
                  Book in Advance
                </Button>
                <Button
                  size="md"
                  radius="md"
                  variant="outline"
                  color="#008080"
                  onClick={() => {
                    setBookingModal(false);
                    navigate("/");
                  }}
                >
                  Back
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Booking Confirmation Modal */}
      <Modal
        opened={bookingModal}
        onClose={() => setBookingModal(false)}
        title={
          <Title order={3} align="center">
            Booking Confirmed!
          </Title>
        }
        centered
        radius="md"
      >
        <Stack align="center" spacing="xl">
          <ThemeIcon color="teal" variant="light" size={70} radius="xl">
            <IconCheck size={36} />
          </ThemeIcon>
          <Text size="lg" ta="center" fw={500}>
            Your booking for{" "}
            <Text span fw={700} c="teal">
              {room.title}
            </Text>{" "}
            is confirmed!
          </Text>
          <Text c="dimmed" ta="center" size="sm">
            A confirmation email has been sent to your address with all the
            booking details.
          </Text>
          <Button
            fullWidth
            size="md"
            color="teal"
            onClick={() => setBookingModal(false)}
            radius="md"
            mt="md"
            styles={{ fontWeight: 600 }}
          >
            Close
          </Button>
        </Stack>
      </Modal>

      {/* Advance Booking Modal */}
      <Modal
        opened={advanceModal}
        onClose={() => setAdvanceModal(false)}
        title={
          <Title order={3} align="center">
            Advance Booking Scheduled
          </Title>
        }
        centered
        radius="md"
      >
        <Stack align="center" spacing="xl">
          <ThemeIcon color="blue" variant="light" size={70} radius="xl">
            <IconClock size={36} />
          </ThemeIcon>
          <Text size="lg" ta="center" fw={500}>
            Your advance booking for{" "}
            <Text span fw={700} c="blue">
              {room.title}
            </Text>{" "}
            has been scheduled.
          </Text>
          <Text c="dimmed" ta="center" size="sm">
            We will contact you shortly to finalize the booking details and
            confirm your preferred dates.
          </Text>
          <Button
            fullWidth
            size="md"
            color="blue"
            onClick={() => setAdvanceModal(false)}
            radius="md"
            mt="md"
            styles={{ fontWeight: 600 }}
          >
            Close
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default RoomDetail;
