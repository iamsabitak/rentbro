import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Box,
  Title,
  Text,
  Drawer,
} from "@mantine/core";
import Signup from "./Signup";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleSignIn = () => {
    console.log({ email, password });
  };

  return (
    <Box mx="auto" maxWidth={400} padding="xl">
      <Title order={3} mb="md" align="center">
        Sign In
      </Title>

      {/* Sign In Form */}
      <TextInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        mb="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        mb="md"
      />

      {/* Remember me checkbox and Sign In button */}
      <Group position="apart" mt="md">
        <Checkbox label="Remember me" />
        <Button
          onClick={handleSignIn}
          variant="filled"
          radius="xl"
          color="#008080"
          mr={"4rem"}
        >
          Sign In
        </Button>
      </Group>

      {/* Sign Up Link */}
      <Group position="center" mt="md">
        <Text size="sm">Don&apos;t have an account?</Text>
        <Button variant="filled"
          radius="xl"
          color="#008080"
          mr={"4rem"} onClick={() => setDrawerOpened(true)} size="sm">
          Create one
        </Button>
      </Group>

      {/* Drawer for Sign Up */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="Create a New Account"
        padding="xl"
        size="35rem"
        position="right"
      >
        <Signup />
      </Drawer>
    </Box>
  );
};

export default SignIn;
