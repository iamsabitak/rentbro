import { Box, Button, Flex, Card, Image, Text, Badge } from "@mantine/core";
import { useState } from "react";

const Facilitites = () => {
  const [showAll, setShowAll] = useState(false);

  const roomData = [
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Cozy Studio Apartment",
      description:
        "Perfect for students. Includes Wi-Fi, water, and electricity.",
      price: "Rs. 15,000/month",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Cozy Studio Apartment",
      description:
        "Perfect for students. Includes Wi-Fi, water, and electricity.",
      price: "Rs. 15,000/month",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Cozy Studio Apartment",
      description:
        "Perfect for students. Includes Wi-Fi, water, and electricity.",
      price: "Rs. 15,000/month",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Cozy Studio Apartment",
      description:
        "Perfect for students. Includes Wi-Fi, water, and electricity.",
      price: "Rs. 15,000/month",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Cozy Studio Apartment",
      description:
        "Perfect for students. Includes Wi-Fi, water, and electricity.",
      price: "Rs. 15,000/month",
    },
    {
      image: "https://images.unsplash.com/photo-1572881940103-8eeb7f5e4a78",
      title: "Spacious 2BHK Flat",
      description: "Ideal for families with ample parking and security.",
      price: "Rs. 30,000/month",
      link: "https://example.com/2bhk-flat",
    },
    {
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      title: "Single Room for Rent",
      description: "Affordable and comfortable room for working professionals.",
      price: "Rs. 10,000/month",
      link: "https://example.com/single-room",
    },
    {
      image: "https://images.unsplash.com/photo-1588222790975-c4f700f8e536",
      title: "Luxury 3BHK Penthouse",
      description: "Fully furnished with a beautiful view of the city skyline.",
      price: "Rs. 50,000/month",
      link: "https://example.com/luxury-penthouse",
    },
    {
      image: "https://images.unsplash.com/photo-1531781466357-5a47efb73ff2",
      title: "Budget Studio Room",
      description: "A compact and affordable studio room with basic amenities.",
      price: "Rs. 8,000/month",
      link: "https://example.com/budget-studio",
    },
  ];

  return (
    <Box m={"2.9rem 2rem 0rem 5rem"}>
      <Box>
        <Text size="2rem" mb={10} fw={700}>
          Our Most Popular Rooms
        </Text>
        <Flex justify={"space-evenly"} align={"center"} gap={"22rem"}>
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
        pt={"2rem"}
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

            <Button variant="filled" color="#008080" radius="md" mt="md">
              View Detail
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default Facilitites;
