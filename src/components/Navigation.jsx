import { Group, Button, Text, Flex } from "@mantine/core";

const Navigation = () => {
  return (
    <Flex
      p={24}
      justify={"right"}
      // align={"center"}
      gap={"18rem"}
      // sx={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      // }}
    >
      <Group gap={40}>
        <Text size="lg" weight={700}>
          Booking
        </Text>
        <Text size="lg">Facilities</Text>
        <Text size="lg">About Us</Text>
        <Text size="lg">Location</Text>
        <Text size="lg">Contact</Text>
      </Group>
      <Button variant="filled" radius="xl" color="#008080" mr={"4rem"}>
        Login
      </Button>
    </Flex>
  );
};

export default Navigation;
