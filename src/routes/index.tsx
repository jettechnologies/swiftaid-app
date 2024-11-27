import React, { useState, useCallback, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Image,
  Spinner,
  Flex,
  Heading,
  Text,
  Button,
  Center,
  VStack,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useNavigate } from "@tanstack/react-router";
import { useToastContext } from "../context";
import { useAuthProvider } from "../hooks";
import { db } from "../firebase-config";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { AuthProvider } from "../types";

type SignupOptionType = {
  icon: string;
  text: string;
};

export const Route = createFileRoute("/")({
  async beforeLoad() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  },
  component: () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <Box as="main" display={"grid"} placeItems={"center"} height="100vh">
          <Image
            src="/swiftaid-logo.png"
            boxSize={"120px"}
            objectFit={"contain"}
            alt="Logo SwiftAid"
          />
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      );
    }

    return <RouteComponent />;
  },
});

function RouteComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null); // Ref to store the Swiper instance
  const { handleProviderSignIn } = useAuthProvider(db);
  const { openToast } = useToastContext();
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      if (currentSlide < swiper.slides.length - 1) {
        swiper?.slideNext(); // Move to the next slide
      } else {
        navigate({ to: "/login" }); // Navigate to the new page
      }
    }
  }, [currentSlide, navigate]);

  const signinWithProvider = async (provider: AuthProvider) => {
    try {
      const user = await handleProviderSignIn(provider);
      openToast(`${provider} sign-in successful`, "success");
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

  const siginButtonOptions = [
    {
      icon: "/facebook-icon.png",
      text: "Continue with Facebook",
      onClick: () => signinWithProvider("facebook"),
    },
    {
      icon: "/google-icon.png",
      text: "Continue with Google",
      onClick: () => signinWithProvider("google"),
    },
    {
      icon: "/apple-icon.png",
      text: "Continue with Apple",
    },
  ];

  return (
    <Center pt="1.5rem">
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Save Swiper instance
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            // Custom bullet style for the first slide
            const isActiveSlide = index === currentSlide && index === 0;
            return `<span classname="${className}" style="background-color: ${
              isActiveSlide ? "#8C5EB9" : "#ccc"
            } width: 5px; height: 5px; border-radius: 50%; margin: 0 4px;"></span>`;
          },
          enabled: currentSlide === 0, // Disable pagination for the second slide
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <Flex
            as="main"
            minHeight={"100vh"}
            flexDirection={"column"}
            alignItems={"center"}
            gap="4rem"
          >
            <Image
              src="/swiftaid-onboarding-icon.png"
              boxSize={"299px"}
              objectFit={"cover"}
              alt="onboarding-icon"
            />
            <Box
              border="1px solid var(--neutral-300)"
              px={"20.8px"}
              pt={"7px"}
              pb={"41.61px"}
              display="flex"
              flexDirection={"column"}
              gap={"2.75rem"}
              borderTopRadius={"34.67px"}
            >
              <Box>
                <Heading
                  as="h2"
                  fontSize={"1.35rem"}
                  fontWeight={"semibold"}
                  lineHeight={"30.14px"}
                  textAlign={"center"}
                  color="var(--neutral)"
                  fontFamily={"var(--font-poppins)"}
                >
                  The Best & Fast Emergency Response App
                </Heading>
                <Text
                  as="p"
                  fontSize={"sm"}
                  fontWeight={"normal"}
                  lineHeight={"30.14px"}
                  textAlign={"center"}
                  color="var(--neutral-100)" // Adjust neutral shade as necessary
                  marginTop={"5px"}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
              <Button
                px="14px"
                py="15.6px"
                bgColor={"var(--primary)"}
                borderRadius={"54px"}
                w="full"
                _hover={{ bgColor: "var(--primary)" }}
                onClick={handleButtonClick}
              >
                <Text
                  as="p"
                  fontWeight={"bold"}
                  textAlign={"center"}
                  fontSize={"sm"}
                  color="var(--white)"
                >
                  Next
                </Text>
              </Button>
            </Box>
          </Flex>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <Flex
            as="main"
            minHeight={"100vh"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Image
              src="/swiftaid-onboarding-icon-2.png"
              objectFit={"cover"}
              alt="onboarding-icon"
              width="206.24px"
              height="213px"
            />
            <Heading
              as="h2"
              fontFamily={"var(--font-urbanist)"}
              fontWeight={"bold"}
              fontSize={"1.75rem"}
              lineHeight={"33px"}
              textAlign={"center"}
              my={"1rem"}
            >
              Get started <br />
              with SwiftAid
            </Heading>
            {/* Buttons */}
            <VStack spacing={"1.5rem"}>
              <VStack spacing={"0.75rem"} width={"19rem"}>
                {siginButtonOptions.map((buttonOption, index) => (
                  <Button
                    leftIcon={
                      <Image src={buttonOption.icon} boxSize="20.76px" />
                    }
                    px={"27.68px"}
                    py={"15.57px"}
                    border="1px solid #eeeeee"
                    textAlign={"center"}
                    width={"full"}
                    height="52px"
                    bgColor={"transparent"}
                    _focus={{
                      borderColor: "var(--teritary)",
                      bgColor: "transparent",
                    }}
                    _hover={{
                      borderColor: "var(--teritary)",
                      bgColor: "transparent",
                    }}
                    key={index}
                    onClick={buttonOption?.onClick}
                  >
                    <Text
                      color={"var(--neutral)"}
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                    >
                      {buttonOption.text}
                    </Text>
                  </Button>
                ))}
              </VStack>
              <Box position="relative" padding="9px">
                <Divider borderColor="#eeeeee" />
                <AbsoluteCenter
                  bg="white"
                  px="4"
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  or
                </AbsoluteCenter>
              </Box>

              <Button
                px="14px"
                py="15.6px"
                bgColor={"var(--primary)"}
                borderRadius={"54px"}
                w="full"
                _hover={{ bgColor: "var(--primary)" }}
                onClick={handleButtonClick}
              >
                <Text
                  as="p"
                  fontWeight={"bold"}
                  textAlign={"center"}
                  fontSize={"sm"}
                  color="var(--white)"
                >
                  Sign in with password
                </Text>
              </Button>
            </VStack>
          </Flex>
        </SwiperSlide>
      </Swiper>
    </Center>
  );
}
