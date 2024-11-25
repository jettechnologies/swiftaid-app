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
} from "@chakra-ui/react";
import { Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useNavigate } from "@tanstack/react-router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

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

  return (
    <Center>
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Save Swiper instance
        pagination={{ clickable: true }}
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
                  color="var(--neutral-100)"
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
                  color="var(--neutral-100)"
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
                  Let's Get Started
                </Text>
              </Button>
            </Box>
          </Flex>
        </SwiperSlide>
      </Swiper>
    </Center>
  );
}
