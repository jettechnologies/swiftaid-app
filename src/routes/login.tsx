import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../utils/schema";

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
  const methods = useForm<SignupFormType>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      rememberMe: false,
    },
  });
  const onSubmit = (data: SignupFormType) => console.log(data);

  const signupIcons: { name: string; icon: string }[] = [
    {
      name: "Facebook",
      icon: "/public/facebook-icon.png",
    },
    {
      name: "Google",
      icon: "/public/google-icon.png",
    },
    {
      name: "Apple",
      icon: "/public/apple-icon.png",
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
          <VStack
            as="form"
            spacing="1rem"
            mt="1.5rem"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputField
              name="email"
              type="text"
              labelTextTransform="uppercase"
              placeholder="email address"
              icon={<Mail size="14px" color="var(--neutral)" />}
              fontWeight="semibold"
              height="50px"
              bgColor={"#FAFAFA"}
            />
            <InputField
              name="phone"
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
            <Box display="flex" flexDirection="column" width={"full"}>
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
              _hover={{ bgColor: "var(--primary)" }}
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
          </VStack>
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
              <Box
                border={"1px solid #eeeeee"}
                py="0.9rem"
                px="1.65rem"
                borderRadius="15.06px"
                cursor={"pointer"}
              >
                <Image
                  src={icon.icon}
                  alt={icon.name}
                  boxSize={"20.07px"}
                  objectFit="cover"
                />
              </Box>
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
