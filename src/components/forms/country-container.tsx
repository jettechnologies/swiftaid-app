// import {
//   Box,
//   Flex,
//   Spacer,
//   HStack,
//   Text,
//   Checkbox,
//   Image,
// } from "@chakra-ui/react";
// import { useFormContext } from "react-hook-form";
// import { Country } from "../../types";

// type CountryContainerProps = {
//   country: Country;
//   name: string;
//   isSelected: boolean;
// };

// export const CountryContainer = ({
//   name,
//   isSelected,
//   country,
// }: CountryContainerProps) => {
//   const { register } = useFormContext();

//   return (
//     <Box
//       width="full"
//       height="66px"
//       padding="1.4rem"
//       border={`1px solid ${isSelected ? "#a5c339" : "#EEEEEE"}`}
//       borderRadius="14px"
//     >
//       <Flex>
//         <HStack spacing="1.4rem" height="100%">
//           <Image
//             src={country.flag}
//             alt={`${country.name} flag`}
//             boxSize="25.37px"
//             object-fit="cover"
//           />
//           <Text
//             as="p"
//             sx={{
//               fontWeight: "500",
//               fontSize: "sm",
//               color: "#BDBDBD",
//             }}
//           >
//             {country.cca2}
//           </Text>
//           <Text
//             as="p"
//             sx={{
//               fontWeight: "500",
//               fontSize: "14px",
//               color: "var(--neutral)",
//             }}
//           >
//             {country.name.common}
//           </Text>
//         </HStack>
//         <Spacer />
//         <Checkbox
//           {...register(name)}
//           isChecked={isSelected}
//           size="md"
//           // color={color}
//           colorScheme="green"
//           sx={{
//             "span.chakra-checkbox__control": {
//               border: "1px solid #a5c339",
//               borderRadius: "4px",
//             },
//           }}
//         />
//       </Flex>
//     </Box>
//   );
// };

import {
  Box,
  Flex,
  Spacer,
  HStack,
  Text,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Country } from "../../types";

type CountryContainerProps = {
  country: Country;
  name: string;
};

export const CountryContainer = ({ name, country }: CountryContainerProps) => {
  const { register, setValue, watch } = useFormContext();
  const isSelected = watch(name);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.checked); // Update the form state when toggling
  };

  return (
    <Box
      width="full"
      height="66px"
      padding="1.4rem"
      border={`1px solid ${isSelected ? "#a5c339" : "#EEEEEE"}`}
      borderRadius="14px"
      cursor="pointer"
      onClick={() => setValue(name, !isSelected)} // Toggle selection on box click
    >
      <Flex>
        <HStack spacing="1.4rem" height="100%">
          <Image
            src={country.flag}
            alt={`${country.name} flag`}
            boxSize="25.37px"
            objectFit="cover"
          />
          <Text
            as="p"
            sx={{
              fontWeight: "500",
              fontSize: "sm",
              color: "#BDBDBD",
            }}
          >
            {country.cca2}
          </Text>
          <Text
            as="p"
            sx={{
              fontWeight: "500",
              fontSize: "14px",
              color: "var(--neutral)",
            }}
          >
            {country.name.common}
          </Text>
        </HStack>
        <Spacer />
        <Checkbox
          {...register(name)}
          isChecked={isSelected}
          onChange={handleCheckboxChange} // Bind change handler
          size="md"
          colorScheme="green"
          sx={{
            "span.chakra-checkbox__control": {
              border: "1px solid #a5c339",
              borderRadius: "4px",
            },
          }}
        />
      </Flex>
    </Box>
  );
};
