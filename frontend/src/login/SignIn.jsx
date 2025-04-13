import { useEffect, useState } from "react";
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

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true); // Set the authenticated state to true
      navigate("/"); // Redirect to home or dashboard
    }
  }, [navigate, setIsAuthenticated]); // Run this effect only once, when the component mounts

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
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
        const userData = {
          name: `${data?.first_Name || "No"} ${data?.last_Name || "Name"}`,
          avatar: data?.avatar || "",
        };

        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
        navigate("/"); // Redirect to home or dashboard
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
          loading={isLoading} 
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
