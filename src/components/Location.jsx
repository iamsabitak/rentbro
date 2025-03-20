import { Text, Box, Image, Flex, Button, Card, Badge } from "@mantine/core";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

const pricingData = [
  {
    plan: "Basic Plan",
    price: 1499,
    features: ["Personalized Recommendations", "Rent Comparison"],
    missingFeatures: [
      "Local Insights",
      "Assisted Negotiations",
      "Move-In Assistance",
      "Dedicated Account Manager",
    ],
  },
  {
    plan: "Premium Plan",
    price: 3499,
    features: [
      "Personalized Recommendations",
      "Rent Comparison",
      "Local Insights",
      "Assisted Negotiations",
    ],
    missingFeatures: ["Move-In Assistance", "Dedicated Account Manager"],
    popular: true,
  },
  {
    plan: "Enterprise Plan",
    price: 5999,
    features: [
      "Personalized Recommendations",
      "Rent Comparison",
      "Local Insights",
      "Assisted Negotiations",
      "Move-In Assistance",
      "Dedicated Account Manager",
    ],
    missingFeatures: [],
  },
];

const Location = () => {
  const discoveryTextArray = [
    <Text key="para1">
      At RentBro, we began with a simple mission: to revolutionize the way
      people find and rent rooms. Our journey started when a group of passionate
      professionals recognized the challenges renters and landlords face in
      traditional rental processes lack of verified listings, complex payment
      methods, and unreliable customer support. From our humble beginnings as a
      small startup, we’ve grown into a trusted platform that simplifies room
      rentals for students, professionals, families, and landlords alike.
    </Text>,
    <Text key="para2">
      Over the years, we’ve expanded our features to include advanced search
      filters, secure payments, and a seamless rental experience. What started
      as an idea to improve the room rental process has now become a trusted
      solution for thousands of users across the country. At RentBro, we’re
      proud to be making renting easy, transparent, and reliable for everyone.
    </Text>,
  ];

  return (
    <Box pb={"2rem"}>
      <Flex
        m={"5rem 2rem 0rem 5rem"}
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
        gap={"1.7rem"}
      >
        <Image
          src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
          w={600}
          h={550}
          alt="House"
          style={{
            borderStartStartRadius: "1rem",
          }}
        />
        <Box p={`3rem`}>
          <Text size="2.5rem" weight={900} mb={"1.9rem"}>
            Discover our History
          </Text>

          {discoveryTextArray.map((textElement) => (
            <Text size="1rem" mb={10} key={textElement.key} c="dimmed">
              {textElement}
            </Text>
          ))}
          <Button
            variant="filled"
            radius="xl"
            color="#008080"
            mt={"2rem"}
            align="center"
          >
            Explore More
          </Button>
        </Box>
      </Flex>
      {/* Pricing component */}
      <Box
        m={"5rem 2.5rem 0rem 2.9rem"}
        style={{ textAlign: "center", padding: "2rem" }}
      >
        <Text size="2.5rem" weight={900} fw={700}>
          Affordable Plans for Every Budget
        </Text>
        <Flex justify="center" gap="2rem" wrap="wrap" mt={"4rem"}>
          {pricingData.map(
            ({ plan, price, features, missingFeatures, popular }) => (
              <Card key={plan} withBorder shadow="sm" p="2rem" w={349}>
                <Flex justify="space-between" align={"center"} mb={"0.3rem"}>
                  <Text fw={600}>{plan}</Text>
                  {popular && (
                    <Badge
                      color="yellow"
                      // styles={{ label: { color: "black" } }}
                    >
                      Most Popular
                    </Badge>
                  )}
                </Flex>
                <Text fw={700} size="2rem" mt={10} align="left">
                  ₹{price}
                </Text>
                <Box
                  style={{
                    padding: 0,
                    marginTop: 10,
                    textAlign: "left",
                  }}
                >
                  {features.map((feature) => (
                    <Text key={feature} style={{ color: "#008080" }}>
                      <IconCircleCheck /> {feature}
                    </Text>
                  ))}
                  {missingFeatures.map((feature) => (
                    <Text key={feature} style={{ color: "#888" }}>
                      <IconCircleX /> {feature}
                    </Text>
                  ))}
                </Box>
                <Button fullWidth mt={15} color="#008080" textcolor="black">
                  Select Plan
                </Button>
              </Card>
            )
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Location;
