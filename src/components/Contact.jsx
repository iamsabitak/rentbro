import { useState } from "react";
import { Avatar, Text, Group, Box, Flex, Image } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const testimonials = [
  {
    name: "Suraj Kumar",
    role: "Professional",
    text: "RentBro made it so easy to find a great place! The filters and verified listings saved me a lot of time.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Freelancer",
    text: "I found my dream apartment within minutes! Highly recommend RentBro for hassle-free searches.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Patel",
    role: "Software Engineer",
    text: "RentBro's verified listings are a game-changer! I saved so much time finding the right place.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <Flex align={"center"} pb={"2rem"}>
      <Text
        bg={activeIndex === 0 ? "#e0e0e0" : "#f5f5f5"}
        ml={"6rem"}
        mr={"-2rem"}
        m={"2rem"}
        w={"3rem"}
        h={"2.9rem"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #f5f5f5",
          borderRadius: "50%",
          padding: "0.56rem",
          cursor: activeIndex === 0 ? "not-allowed" : "pointer",
          boxShadow:
            activeIndex === 0 ? "none" : "4px 4px 10px rgba(0, 0, 0, 0.1)",
          opacity: activeIndex === 0 ? 0.5 : 1,
        }}
        onClick={activeIndex === 0 ? undefined : handlePrev}
      >
        <IconChevronLeft size={"1.6rem"} color="#008080" />
      </Text>
      <Flex
        mt={"1rem"}
        ml={"2rem"}
        mr={"1rem"}
        mb={"1rem"}
        bg={" #ebfcfc"}
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
        <Group position="apart" pl={`3rem`}>
          <Box style={{ textAlign: "center" }}>
            <Text size="lg" fw={500} align="left">
              {testimonials[activeIndex].text}
            </Text>
            <Group mt="md" position="center">
              <Avatar src={testimonials[activeIndex].image} radius="xl" />
              <Box>
                <Text fw={700} align="left">
                  {testimonials[activeIndex].name}
                </Text>
                <Text size="sm" c="dimmed" align="left">
                  {testimonials[activeIndex].role}
                </Text>
              </Box>
            </Group>
          </Box>
        </Group>

        <Image
          src={testimonials[activeIndex].image}
          h={300}
          alt="House"
          style={{
            borderStartEndRadius: "1rem",
          }}
        />
      </Flex>
      <Text
        bg={activeIndex === testimonials.length - 1 ? "#e0e0e0" : "#f5f5f5"}
        ml="-1rem"
        mr="6rem"
        w="3rem"
        h="2.9rem"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #f5f5f5",
          borderRadius: "50%",
          padding: "0.56rem",
          cursor:
            activeIndex === testimonials.length - 1 ? "not-allowed" : "pointer",
          boxShadow:
            activeIndex === testimonials.length - 1
              ? "none"
              : "4px 4px 10px rgba(0, 0, 0, 0.1)",
          opacity: activeIndex === testimonials.length - 1 ? 0.5 : 1,
        }}
        onClick={
          activeIndex === testimonials.length - 1 ? undefined : handleNext
        }
      >
        <IconChevronRight size={"1.7rem"} color="#008080" />
      </Text>
    </Flex>
  );
};

export default Contact;
