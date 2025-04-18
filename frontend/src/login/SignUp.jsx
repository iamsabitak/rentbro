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

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import useValidation from "../utils/useValidation";

// eslint-disable-next-line react/prop-types
const SignUp = ({ setIsAuthenticated }) => {
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
          // Don't navigate to sign-in page, just show the error.
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <Group grow>
              <TextInput
                label="First Name"
                placeholder="Sabita"
                required
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <TextInput
                label="Last Name"
                placeholder="Khadka"
                required
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </Group>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              required
              {...register("email")}
              error={errors.email?.message}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              // onPaste={(e) => e.preventDefault()}
              {...register("password")}
              error={errors.password?.message}
            />
            <PasswordInput
              // onPaste={(e) => e.preventDefault()}
              label="Confirm Password"
              placeholder="Re-enter password"
              required
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <Checkbox
              label="I agree to the terms and conditions"
              mt="xs"
              required
              {...register("terms")}
              error={errors.terms?.message}
            />
            <Button
              fullWidth
              radius="xl"
              color="#008080"
              loading={loading}
              mt="sm"
              type="submit"
            >
              Register
            </Button>
          </form>
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
