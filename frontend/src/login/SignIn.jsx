import { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Title,
  Text,
  Alert,
  Paper,
  Stack,
  Box,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SignIn = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [navigate, setIsAuthenticated]);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    console.log("Sending", { email, password });

    setIsLoading(true);
    setError("");

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
          firstName: data?.user?.firstName || "No",
          lastName: data?.user?.lastName || "Name",
          avatar: data?.user?.avatar || "",
        };

        localStorage.setItem("user", JSON.stringify(userData));

        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError(data.message || "Sign in failed, please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
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
        <Title align="center" order={2} mb="md" c="#008080">
          Welcome Back 👋
        </Title>

        <Text c="dimmed" size="sm" align="center" mb="lg">
          Please sign in to your account
        </Text>

        {error && (
          <Alert
            color="red"
            mb="md"
            withCloseButton
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <Stack spacing="md">
          <TextInput
            label="Email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            radius="md"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            radius="md"
            required
          />
          <Group position="apart" mt="xs">
            <Checkbox label="Remember me" />
          </Group>
          <Button
            fullWidth
            radius="xl"
            mt="md"
            onClick={handleSignIn}
            color="#008080"
            loading={isLoading}
          >
            Sign In
          </Button>
        </Stack>

        <Divider my="xl" label="or" labelPosition="center" />

        <Group position="center">
          <Text size="sm">Don’t have an account?</Text>
          <Button
            variant="outline"
            color="#008080"
            radius="xl"
            size="xs"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Group>
      </Paper>
    </Box>
  );
};

export default SignIn;
