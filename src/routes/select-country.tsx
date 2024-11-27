import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchPaginatedCountries, fetchCountryByName } from "../api-method";
import { getRouteApi, useLocation } from "@tanstack/react-router";
import { CountryContainer, InputField } from "../components/forms";
import { useForm, FormProvider, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, VStack, Heading, Text, Center } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useToastContext } from "../context";
import { db } from "../firebase-config";
import { useFirestore } from "../hooks/useFirestore";
import { where } from "firebase/firestore";
import * as yup from "yup";

// Validation schema
const signupSchema = yup.object().shape({
  selectedCountries: yup
    .object()
    .required("Please select at least one country"),
  search: yup.string().optional(),
});

// SelectedCountries interface
interface SelectedCountries {
  [key: string]: boolean;
}

interface DefaultValues {
  selectedCountries: SelectedCountries;
  search?: string;
}

// Route definition
export const Route = createFileRoute("/select-country")({
  loader: () => fetchPaginatedCountries(),
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  const routeApi = getRouteApi("/select-country");
  const countries = routeApi.useLoaderData();
  const { openToast } = useToastContext();
  const { updateDocument, queryDocuments } = useFirestore(db);

  const [filteredCountries, setFilteredCountries] = React.useState(
    countries.countries
  );

  // Example function to fetch users
  const fetchUserByEmail = async (email: string) => {
    try {
      // Query the 'users' collection with a constraint to match the email
      const users = await queryDocuments("users", [
        where("email", "==", email),
      ]);

      if (users.length === 0) {
        console.log(`No user found with email: ${email}`);
        return null; // Return null if no user is found
      }

      // Assuming emails are unique, return the first user
      return users[0];
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  };

  const methods = useForm<DefaultValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      selectedCountries: countries.countries.reduce(
        (acc: SelectedCountries, country) => {
          acc[country.name.common] = false;
          return acc;
        },
        {}
      ),
      search: "", // Added search field
    },
  });

  const { handleSubmit, watch, setValue, formState, resetField, reset } =
    methods;

  // Watch for search input changes
  const searchValue = watch("search");

  const handleSearch = React.useCallback(
    async (value: string | undefined) => {
      if (!value?.trim()) {
        // Reset to original countries if the search input is empty
        setFilteredCountries(countries.countries);
        return;
      }

      try {
        const result = await fetchCountryByName(value);
        if (result && result.length > 0) {
          setFilteredCountries(result);
        } else {
          setFilteredCountries([]);
          openToast("No countries found", "info");
        }
      } catch (error) {
        console.error("Error fetching country by name:", error);
        openToast("Error fetching country by name", "error");
      }
    },
    [countries.countries, openToast]
  );

  // Effect to trigger search when `searchValue` changes
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchValue);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, handleSearch]);

  console.log(filteredCountries);

  const onSubmit = async (data: any) => {
    const singleUser = await fetchUserByEmail(email);
    if (!!singleUser) {
      const selectedCountries = Object.entries(data.selectedCountries)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      if (selectedCountries.length === 0) {
        openToast("Please select at least one country", "warning");
        return;
      } else if (selectedCountries.length > 1) {
        openToast("Please unselect other country", "warning");
        resetField(
          `selectedCountries.${selectedCountries[selectedCountries.length - 1]}`,
          {
            defaultValue: false,
          }
        );
        return;
      }

      console.log("Selected Countries:", selectedCountries);
      try {
        updateDocument("users", singleUser.id, {
          country: selectedCountries[0],
        });
        openToast("user's profile updated", "success");
        reset();
      } catch (error) {
        console.error("Error updating selected countries:", error);
        openToast("Error updating selected countries", "error");
      }
    }

    console.log(singleUser);
  };

  return (
    <Center pt="1.5rem" pb="2.5rem">
      <Box width="100%" px={"1.5rem"}>
        <Heading
          as="h3"
          fontSize={"20.3px"}
          lineHeight="24.36px"
          fontWeight={"bold"}
          color={"var(--neutral)"}
        >
          Select Your Country
        </Heading>
        <FormProvider {...methods}>
          <Box
            as={Form}
            onSubmit={handleSubmit(onSubmit)}
            width="100%"
            maxW="600px"
            mx="auto"
            mt="4"
          >
            <InputField
              name="search"
              type="text"
              placeholder="Search"
              icon={<Search size="14px" color="#BDBDBD" />}
              fontWeight="semibold"
              height="47.36px"
              bgColor={"#FAFAFA"}
              // onBlur={() => handleSearch(searchValue)}
            />
            <VStack spacing="4" align="stretch" mt="1.5rem">
              {filteredCountries.map((country) => (
                <CountryContainer
                  key={country.cca2}
                  country={country}
                  name={`selectedCountries.${country.name.common}`}
                />
              ))}
            </VStack>
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
              loadingText="Submitting..."
            >
              <Text
                as="p"
                fontWeight={"bold"}
                textAlign={"center"}
                fontSize={"sm"}
                color="var(--white)"
              >
                Continue
              </Text>
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Center>
  );
}
