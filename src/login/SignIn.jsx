import { useState } from "react";
import { TextInput, PasswordInput, Checkbox, Button, Group, Box, Title} from "@mantine/core";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log({ email, password });
  };

  return (
    <Box mx="auto" maxWidth={400}>
      <Title order={3} mb="md">Sign In</Title>
      <TextInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        mt="md"
      />
      <Group position="apart" mt="md">
        <Checkbox label="Remember me" />
        <Button onClick={handleSignIn}>Sign In</Button>
      </Group>
    </Box>
  );
};
