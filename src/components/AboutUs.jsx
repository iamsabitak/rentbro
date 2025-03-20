import { Text, Box, Flex, Card, Button } from "@mantine/core";
import {
  IconAntennaBars1,
  IconBarbell,
  IconBolt,
  IconDevicesPc,
  IconParkingCircle,
  IconWifi,
} from "@tabler/icons-react";

const AboutUs = () => {
  const cardData = [
    {
      icon: <IconDevicesPc size={40} stroke={1.5} color="#0A7D8F" />,
      title: "Private Workspace",
    },
    {
      icon: <IconParkingCircle size={40} stroke={1.5} color="#0A7D8F" />,
      title: "Parking Area",
    },
    {
      icon: <IconWifi size={40} stroke={1.5} color="#0A7D8F" />,
      title: "High-Speed-Wifi",
    },
    {
      icon: <IconBolt size={40} stroke={1.5} color="#0A7D8F" />,
      title: "Power Backup",
    },
    {
      icon: <IconBarbell size={40} stroke={1.5} color="#0A7D8F" />,
      title: "Gym and Fitness",
    },
    {
      icon: <IconAntennaBars1 size={40} stroke={1.5} color="#0A7D8F" />,
      title: "Other Services",
    },
  ];

  return (
    <Flex m={"4rem 2rem 0rem 5rem"} gap={"10rem"}>
      <Box size="1.9rem" mb={10} w={"43rem"}>
        <Text size="2.9rem" fw={700} mb={10}>
          We do our Best facilities provide you
        </Text>
        <Text c="dimmed" mt={20}>
          Enjoy top-notch amenities that make your stay comfortable and
          convenient.
        </Text>
        <Button
          variant="filled"
          radius="xl"
          color="#008080"
          mr={"4rem"}
          mt={"3rem"}
        >
          Contact Now
        </Button>
      </Box>

      <Flex
        justify={"center"}
        align={"center"}
        wrap="wrap"
        mr={"3rem"}
        gap={"2rem"}
      >
        {cardData.map((card, index) => (
          <Card
            key={index}
            w={"11rem"}
            h={"10rem"}
            style={{
              border: "0.9px solid #dedede",
              padding: "2.8rem 0rem 2rem 0rem",
              boxShadow: "5px 5px 5px 5px #f5f5f5",
            }}
          >
            <Card.Section align="center">{card.icon}</Card.Section>

            <Text fw={500} size="1rem" mt="md" align="center">
              {card.title}
            </Text>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default AboutUs;
