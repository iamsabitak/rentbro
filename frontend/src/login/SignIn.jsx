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
  Alert, // Import Alert for displaying errors
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SignIn = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return; // Early return if validation fails
    }

    setIsLoading(true); // Show loading indicator while requesting
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/"); // Navigate to the home page or any other page
      } else {
        setError(data.message || "Sign in failed, please try again.");
      }
    } catch (error) {
      setError(error, "An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <Box mx="auto" maxWidth={400} padding="xl">
      <Title order={3} mb="md" align="center">
        Sign In
      </Title>

      {/* Show error if any */}
      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

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

      <Group position="apart" mt="md">
        <Checkbox label="Remember me" />
        <Button
          onClick={handleSignIn}
          variant="filled"
          radius="xl"
          color="#008080"
          loading={isLoading} // Show loading spinner when submitting
        >
          Sign In
        </Button>
      </Group>

      <Group position="center" mt="md">
        <Text size="sm">Don&apos;t have an account?</Text>
        <Button
          variant="filled"
          radius="xl"
          color="#008080"
          size="sm"
          onClick={() => navigate("/signup")}
        >
          Create one
        </Button>
      </Group>
    </Box>
  );
};

export default SignIn;
