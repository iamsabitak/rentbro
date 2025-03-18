import { Group, Text, Box, Input, Image, Flex } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";

const Hero = () => {
  return (
    <Flex
      m={50}
      justify={"center"}
      align={"center"}
      gap={"1rem"}
      bg={" #0080800A"}
    >
      <Box
        sx={{ maxWidth: "50%" }}
        styles={{ borderRadius: "10rem", border: "1px solid #008080" }}
      >
        <Text size="xl" weight={700} mb={10}>
          Find Your Perfect Room, Anytime, Anywhere
        </Text>
        <Text c="dimmed" mb={20}>
          Discover verified listings, flexible leases, and secure payments.
          Renting made easy for everyone!
        </Text>
        <Group spacing={10}>
          <IconPlayerPlay size={30} />
          <Text weight={600}>Watch video</Text>
        </Group>
        <Input
          placeholder="Search rooms by location, budget, amenities, and more..."
          mt={20}
          radius="xl"
          size="md"
        />
      </Box>
      <Image
        src="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/6/Cyan-Colour-in-Bedroom_0_1200.jpg"
        w={500}
        h={600}
        radius="lg"
        alt="House"
      />
    </Flex>
  );
};

export default Hero;
