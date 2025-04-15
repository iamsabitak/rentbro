/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Alert,
  Paper,
  Stack,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SignUp = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setErrorMessage("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_Name: firstName,
          last_Name: lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        alert("Signup successful!");
        navigate("/signin");
      } else {
        setErrorMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      mih="100vh"
      bg="#f9f9f9"
      px="md"
      py="xl"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper shadow="md" radius="lg" p="xl" withBorder w={500}>
        <Title order={2} align="center" mb="sm" c="#008080">
          Create an Account
        </Title>

        <Text align="center" mb="lg" c="dimmed" size="sm">
          Join us to explore more features.
        </Text>

        {errorMessage && (
          <Alert
            color="red"
            mb="md"
            radius="md"
            withCloseButton
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        )}

        <Stack spacing="sm">
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="Sabita"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextInput
              label="Last Name"
              placeholder="Khadka"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Group>

          <TextInput
            label="Email"
            placeholder="you@example.com"
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
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Checkbox
            label="I agree to the terms and conditions"
            mt="xs"
            required
          />

          <Button
            fullWidth
            radius="xl"
            color="#008080"
            onClick={handleSignUp}
            loading={loading}
            mt="sm"
          >
            Register
          </Button>
        </Stack>

        <Divider my="lg" label="or" labelPosition="center" />

        <Group position="center">
          <Text size="sm">Already have an account?</Text>
          <Button
            size="xs"
            variant="outline"
            radius="xl"
            color="#008080"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </Group>
      </Paper>
    </Box>
  );
};

export default SignUp;
