import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  Divider,
  Image,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { InputField, CheckboxField } from "../components/forms";
import { Mail, Phone, Lock } from "lucide-react";
import { useForm, FormProvider, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../utils/schema";
import { app, db } from "../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useToastContext } from "../context";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { useAuthProvider } from "../hooks";
import { AuthProvider } from "../types";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

type SignupFormType = {
  email: string;
  contact: string;
  password: string;
  rememberMe: boolean;
};

function RouteComponent() {
  const auth = getAuth(app);
  const { openToast } = useToastContext();
  const { handleProviderSignIn } = useAuthProvider(db);
  const navigate = useNavigate();

  const methods = useForm<SignupFormType>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  // Handle manual signup
  const onSubmit = async (data: SignupFormType) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      const userData = await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullname: "",
        username: "",
        email: data.email,
        contact: data.contact,
        country: "",
        dob: "",
        occupation: "",
        profileImg: "",
        createdAt: new Date().toISOString(),
      });

      console.log(user);
      methods.reset();
      openToast("User created successfully", "success");
      navigate({
        to: "/select-country",
        state: { email: data.email },
      });
    } catch (error: any) {
      console.error("Error creating user:", error);
      openToast(`Signup failed: ${error.message}`, "error");
      // reset();
    }
  };

  // sigin using provider popup
  const signinWithProvider = async (provider: AuthProvider) => {
    try {
      const user = await handleProviderSignIn(provider);
      openToast(`${provider} sign-in successful`, "success");
      // navigate({ to: "/select-country" });
      navigate({
        to: "/select-country",
        state: { email: user?.email ?? "" },
      });
      console.log("Signed in user:", user);
    } catch (error: any) {
      openToast(
        `Failed to sign in with ${provider}: ${error.message}`,
        "error"
      );
      console.error("Sign-in error:", error);
    }
  };

  const signupIcons = [
    {
      name: "Facebook",
      icon: "facebook-icon.png",
      onClick: () => signinWithProvider("facebook"),
    },
    {
      name: "Google",
      icon: "/google-icon.png",
      onClick: () => signinWithProvider("google"),
    },
    {
      name: "Apple",
      icon: "/apple-icon.png",
      // onClick: () => handleProviderSignIn("apple"),
    },
  ];

  return (
    <Center pt="1.5rem" pb="2.5rem">
      <Box width="100%" px={"1.5rem"}>
        <Heading fontSize={"34px"} fontWeight={"bold"} color={"var(--neutral)"}>
          Create your <br />
          Account
        </Heading>
        <FormProvider {...methods}>
          <Box as="form" mt="1.5rem" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              name="email"
              type="text"
              placeholder="email address"
              icon={<Mail size="14px" color="var(--neutral)" />}
              fontWeight="semibold"
              height="50px"
              bgColor={"#FAFAFA"}
            />
            <InputField
              name="contact"
              type="text"
              labelTextTransform="uppercase"
              placeholder="contact"
              icon={<Phone size="14px" color="var(--neutral)" />}
              height="50px"
              fontWeight="semibold"
              bgColor={"#FAFAFA"}
            />
            <InputField
              name="password"
              type="password"
              password
              labelTextTransform="uppercase"
              placeholder="password"
              icon={<Lock size="14px" color="var(--neutral)" />}
              height="50px"
              fontWeight="semibold"
              bgColor={"#FAFAFA"}
            />
            <Box display="flex" flexDirection="column" width={"full"} mt="1rem">
              <CheckboxField
                name="rememberMe"
                label="Remember me"
                fontWeight={"semibold"}
                accentColor={"var(--primary)"}
                sx={{
                  "span.chakra-checkbox__control": {
                    border: "1px solid #a5c339",
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              px="14px"
              py="15.6px"
              bgColor={"var(--primary)"}
              borderRadius={"54px"}
              w="full"
              mt="1rem"
              _hover={{ bgColor: "var(--primary)" }}
              isLoading={methods.formState.isSubmitting}
              loadingText="Logining..."
              // onClick={handleButtonClick}
            >
              <Text
                as="p"
                fontWeight={"bold"}
                textAlign={"center"}
                fontSize={"sm"}
                color="var(--white)"
              >
                Sign up
              </Text>
            </Button>
          </Box>
        </FormProvider>
        <Box mt="1.5rem">
          <Box position="relative" padding="9px" mb="2rem">
            <Divider borderColor="#eeeeee" />
            <AbsoluteCenter
              bg="white"
              px="4"
              fontWeight="semibold"
              fontSize="sm"
            >
              or continue with
            </AbsoluteCenter>
          </Box>
          <HStack spacing={"1rem"} height="50px" justifyContent={"center"}>
            {signupIcons.map((icon) => (
              <Button
                variant={"outline"}
                border={"1px solid #eeeeee"}
                py="0.9rem"
                px="1.65rem"
                borderRadius="15.06px"
                cursor={"pointer"}
                key={icon.name}
                onClick={icon.onClick}
              >
                <Image
                  src={icon.icon}
                  alt={icon.name}
                  boxSize={"20.07px"}
                  objectFit="cover"
                />
              </Button>
            ))}
          </HStack>
        </Box>
        <Text
          as="p"
          sx={{
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "1rem",
            color: "var(--neutral-200)",
            marginTop: "1.5rem",
            textAlign: "center",
          }}
        >
          Already have an account?
          <Text as={Link} to="/" color="var(--secondary)" fontWeight="semibold">
            {" "}
            Sign in
          </Text>
        </Text>
      </Box>
    </Center>
  );
}
