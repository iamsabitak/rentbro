import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

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
        alert("✅ Signup successful!");
        console.log(data);
        // Optionally redirect to sign-in page
      } else {
        alert(`❌ ${data.message || "Signup failed"}`);
        console.log(data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <Box mx="auto" maxWidth={400} padding="xl">
      <Title order={3} mb="md" align="center">
        Sign Up
      </Title>
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
      >
        Register
      </Button>

      {/* Already have an account? Section */}
      <Group position="center" mt="md">
        <Text size="sm">Already have an account?</Text>
        <Button
          variant="filled"
          radius="xl"
          color="#008080"
          mr={"4rem"}
          size="sm"
        >
          Sign In
        </Button>
      </Group>
    </Box>
  );
};

export default Signup;
