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

  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const [loading, setLoading] = useState(false); // To track form submission

  const handleSignUp = async () => {
    // Clear previous errors
    setErrorMessage("");

    // Check for required fields and password match
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading state to true

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
        navigate("/"); // Navigate to home page after signup
      } else {
        setErrorMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error,
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box mx="auto" maxWidth={400} padding="xl">
      <Title order={3} mb="md" align="center">
        Sign Up
      </Title>

      {/* Error Message Display */}
      {errorMessage && (
        <Alert color="red" mb="md">
          {errorMessage}
        </Alert>
      )}

      <Group grow>
        <TextInput
          label="First name"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextInput
          label="Last name"
          placeholder="Your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Group>

      <TextInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        mt="md"
      />

      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        mt="md"
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        mt="md"
      />

      <Checkbox label="I agree to the terms and conditions" mt="md" required />

      <Button
        variant="filled"
        radius="xl"
        color="#008080"
        onClick={handleSignUp}
        mt="md"
        loading={loading} // Display loading spinner while submitting
      >
        Register
      </Button>

      <Group position="center" mt="md">
        <Text size="sm">Already have an account?</Text>
        <Button
          variant="filled"
          radius="xl"
          color="#008080"
          size="sm"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </Button>
      </Group>
    </Box>
  );
};

export default SignUp;
