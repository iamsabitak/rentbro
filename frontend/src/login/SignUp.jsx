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
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useValidation from "../utils/useValidation";

// eslint-disable-next-line react/prop-types
const SignUp = ({ setIsAuthenticated }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setErrorMessage("");

    const { firstName, lastName, email, password, confirmPassword } = data;

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

      const resData = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/signin");
      } else {
        if (resData.message === "Email already exists") {
          setErrorMessage(
            "This email is already registered. Try logging in instead."
          );
        } else {
          setErrorMessage(
            resData.message || "Signup failed. Please try again."
          );
        }
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const schema = useValidation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Box
      mih="100vh"
      // bg="linear-gradient(135deg, #f6f9fc 0%, #eef2f5 100%)"
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
          maxWidth: 600,
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
        <Title
          order={2}
          align="center"
          mb="md"
          style={{
            color: "#008080",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          Create an Account
        </Title>

        <Text
          align="center"
          mb="xl"
          style={{
            color: "#64748B",
            fontSize: "0.9rem",
          }}
        >
          Join us to explore more features.
        </Text>

        {errorMessage && (
          <Alert
            color="red"
            mb="md"
            radius="md"
            withCloseButton
            onClose={() => setErrorMessage("")}
            style={{
              borderLeft: "3px solid #ef4444",
            }}
          >
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="md">
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
            <Group grow>
              <TextInput
                radius="md"
                required
                variant="filled"
                size="md"
                label="First Name"
                placeholder="Sabita"
                {...register("firstName")}
                error={errors.firstName?.message}
                styles={{
                  input: {
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    ":focus": {
                      borderColor: "#008080",
                      boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.2)",
                    },
                  },
                }}
              />
              <TextInput
                radius="md"
                required
                variant="filled"
                size="md"
                label="Last Name"
                placeholder="Khadka"
                {...register("lastName")}
                error={errors.lastName?.message}
                styles={{
                  input: {
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    ":focus": {
                      borderColor: "#008080",
                      boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.2)",
                    },
                  },
                }}
              />
            </Group>

            <TextInput
              radius="md"
              required
              variant="filled"
              size="md"
              label="Email"
              placeholder="you@example.com"
              {...register("email")}
              error={errors.email?.message}
              styles={{
                input: {
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  ":focus": {
                    borderColor: "#008080",
                    boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.2)",
                  },
                },
              }}
            />

            <PasswordInput
              variant="filled"
              label="Password"
              placeholder="Your password"
              radius="md"
              required
              size="md"
              {...register("password")}
              error={errors.password?.message}
              styles={{
                input: {
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  ":focus": {
                    borderColor: "#008080",
                    boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.2)",
                  },
                },
              }}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter password"
              radius="md"
              required
              variant="filled"
              size="md"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              styles={{
                input: {
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  ":focus": {
                    borderColor: "#008080",
                    boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.2)",
                  },
                },
              }}
            />

            <Checkbox
              label="I agree to the terms and conditions"
              mt="xs"
              required
              {...register("terms")}
              error={errors.terms?.message}
              color={"#008080"}
              styles={{
                label: {
                  color: "#64748B",
                  fontSize: "0.9rem",
                },
              }}
            />

            <Button
              fullWidth
              size="md"
              radius="md"
              style={{
                backgroundColor: "#008080",
                transition: "all 0.2s ease",
                ":hover": {
                  backgroundColor: "#006666",
                  transform: "translateY(-1px)",
                },
                ":active": {
                  transform: "translateY(0)",
                },
              }}
              loading={loading}
              mt="sm"
              type="submit"
            >
              Register
            </Button>
          </Stack>
        </form>

        <Divider
          my="lg"
          label="Or continue with"
          labelPosition="center"
          styles={{
            label: {
              color: "#64748B",
              fontSize: "0.9rem",
            },
          }}
        />

        <Group position="center" spacing="xs">
          <Text size="sm" style={{ color: "#64748B" }}>
            Already have an account?
          </Text>
          <Button
            variant="outline"
            color="#008080"
            onClick={() => navigate("/signin")}
            size="sm"
            compact
            style={{
              fontWeight: 500,
              borderWidth: 1.5,
            }}
          >
            Sign In
          </Button>
        </Group>
      </Paper>
    </Box>
  );
};

export default SignUp;
