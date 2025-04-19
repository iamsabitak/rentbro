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
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SignIn = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
          firstName: data?.user?.first_name || "No",
          lastName: data?.user?.last_name || "Name",
          avatar: data?.user?.avatar || "",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

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
      px="md"
      py="xl"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          theme.colorScheme === "dark"
            ? `linear-gradient(135deg, ${theme.colors.dark[7]} 0%, ${theme.colors.dark[9]} 100%)`
            : `linear-gradient(135deg, ${theme.colors.blue[1]} 0%, ${theme.colors.teal[1]} 100%)`,
      }}
    >
      <Paper
        shadow="xl"
        radius="lg"
        p="3rem"
        withBorder
        style={{
          width: "100%",
          maxWidth: 570,
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[3],
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 120,
            height: 120,
            background:
              theme.colorScheme === "dark"
                ? theme.colors.teal[9]
                : theme.colors.teal[5],
            borderRadius: "0 0 0 100%",
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 80,
            height: 80,
            background:
              theme.colorScheme === "dark"
                ? theme.colors.blue[9]
                : theme.colors.blue[5],
            borderRadius: "0 100% 0 0",
            opacity: 0.2,
          }}
        />

        <Stack spacing="lg" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center" }}>
            <Title order={2} mb="xs" c="#008080">
              Welcome Back!
            </Title>
            <Text c="dimmed" size="sm">
              Sign in to access your dashboard
            </Text>
          </div>

          {error && (
            <Alert
              color="red"
              mb="md"
              withCloseButton
              onClose={() => setError("")}
              variant="light"
              radius="md"
              style={{ borderLeft: `4px solid ${theme.colors.red[6]}` }}
            >
              {error}
            </Alert>
          )}

          <Stack spacing="md">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              radius="md"
              required
              variant="filled"
              size="md"
            />
            <PasswordInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              radius="md"
              required
              variant="filled"
              size="md"
            />
            <Group position="apart">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.currentTarget.checked)}
                color="#008080"
              />
              <Button
                variant="subtle"
                compact
                color="#008080"
                onClick={() => navigate("/forgot-password")}
                size="xs"
                style={{ fontWeight: 500 }}
              >
                Forgot password?
              </Button>
            </Group>
            <Button
              fullWidth
              radius="md"
              mt="sm"
              onClick={handleSignIn}
              color="#008080"
              loading={isLoading}
              size="md"
              style={{
                fontWeight: 600,
                letterSpacing: 0.5,
                transition: "all 0.2s ease",
                transform: "translateY(0)",
                ":hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Stack>

          <Divider
            my="md"
            label="Or continue with"
            labelPosition="center"
            labelProps={{
              size: "sm",
              style: {
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[2]
                    : theme.colors.gray[6],
              },
            }}
          />

          <Group position="center" spacing="xs">
            <Text size="sm" c="dimmed">
              New to our platform?
            </Text>
            <Button
              variant="outline"
              color="#008080"
              onClick={() => navigate("/signup")}
              size="sm"
              compact
              style={{
                fontWeight: 500,
                borderWidth: 1.5,
              }}
            >
              Create account
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignIn;
