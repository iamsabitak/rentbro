import { Group, Text, Box, Image, Flex, Input, Center } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";

const Bookings = () => {
  return (
    <Box pb={"2rem"}>
      <Flex
        m={"0.5rem 2rem 0rem 5rem"}
        mt={"1rem"}
        bg={" #ebfcfc"}
        // bg={"#f5f5f5"}
        border={"1px solid #dedede"}
        align={"center"}
        w={"70rem"}
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
          <Group
            style={{
              cursor: "pointer",
            }}
          >
            <Box
              p={`0.6rem 0.7rem 0.4rem`}
              bg={"#ffffff"}
              style={{
                borderRadius: "15rem",
                border: "1px solid #dedede",
                boxShadow: "0px 0px 3px #aaaaaa",
              }}
            >
              <IconPlayerPlay
                size={20}
                color="#008080"
                fill="#008080"
                radius={"20px"}
              />
            </Box>
            <Text weight={600}>Watch video</Text>
          </Group>
        </Box>
        <Image
          src="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/6/Cyan-Colour-in-Bedroom_0_1200.jpg"
          h={450}
          alt="House"
          style={{
            borderStartEndRadius: "1rem",
          }}
        />
      </Flex>
      <Center mt={-35}>
        <Input
          placeholder="Search rooms by location, budget, amenities, and more..."
          // m={20}
          radius="10rem"
          size="md"
          w={"54rem"}
        />
      </Center>
    </Box>
  );
};

export default Bookings;
