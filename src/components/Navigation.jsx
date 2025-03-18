import { Group, Button, Text, Flex } from "@mantine/core";

const Navigation = () => {
  return (
    <Flex
      py={30}
      justify={"right"}
      // align={"center"}
      gap={"16rem"}
      // sx={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      // }}
    >
      <Group spacing={40}>
        <Text size="lg" weight={700}>
          Booking
        </Text>
        <Text size="lg">Facilities</Text>
        <Text size="lg">About Us</Text>
        <Text size="lg">Location</Text>
        <Text size="lg">Contact</Text>
      </Group>
      <Button variant="filled" radius="xl" color="cyan" mr={"4rem"}>
        Login
      </Button>
    </Flex>
  );
};

export default Navigation;
