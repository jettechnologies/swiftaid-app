import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  Textarea,
  Checkbox,
  InputLeftElement,
  InputProps,
  TextareaProps,
  CheckboxProps,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

type TextTransform = "uppercase" | "capitalize" | "lowercase";

interface InputFieldProps extends InputProps {
  name: string;
  type?: string;
  height?: string;
  label?: string;
  labelInfo?: string;
  labelTextTransform?: TextTransform;
  labelColor?: string;
  required?: boolean;
  password?: boolean;
  placeholder?: string;
  size?: string;
  radius?: string | number | {};
  boldLabel?: boolean;
  icon?: React.ReactElement;
}

interface TextareaFieldProps extends TextareaProps {
  name: string;
  type?: string;
  height?: string;
  label?: string;
  labelInfo?: string;
  labelTextTransform?: TextTransform;
  labelColor?: string;
  required?: boolean;
  password?: boolean;
  placeholder?: string;
  size?: string;
  radius?: string | number | {};
  boldLabel?: boolean;
  // icon?: React.ReactElement;
}

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  label: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

export const InputField = ({
  name,
  label,
  type = "text",
  radius = "8px",
  placeholder,
  password,
  labelInfo,
  labelColor,
  labelTextTransform,
  boldLabel = false,
  icon,
  ...props
}: InputFieldProps) => {
  const { register, formState } = useFormContext();
  const [show, setShow] = React.useState(false);

  const handleShow = React.useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);

  const inputType = password && show ? "text" : type;
  const inputBorderRadius = typeof radius === "string" ? radius : `${radius}px`;

  const inputStyle = {
    fontSize: "12px",
    background: "#fff",
    height: "56px",
    borderRadius: inputBorderRadius,
    // border: "1px solid var(--neutral)",
  };

  const error = formState.errors[name];

  return (
    <FormControl my="1.4em" width="100%">
      {label && (
        <FormLabel
          fontSize="14px"
          textTransform={labelTextTransform || "lowercase"}
          lineHeight="20px"
          fontWeight={boldLabel ? "bold" : "400"}
          color={labelColor || "#211E1D"}
        >
          {label}{" "}
          {labelInfo && (
            <Text as="span" color="var(--deep-blood)" display="inline">
              *{labelInfo}
            </Text>
          )}
        </FormLabel>
      )}

      {password ? (
        <InputGroup>
          <Input
            {...register(name)}
            autoComplete="true"
            type={inputType}
            placeholder={placeholder}
            _placeholder={{
              fontWeight: "600",
              color: "var(--neutral)",
              fontSize: "12px",
              lineHeight: "16px",
              textTransform: "capitalize",
            }}
            {...props}
            {...inputStyle}
          />
          {icon && (
            <InputLeftElement
              width="3rem"
              height="100%"
              display="flex"
              alignItems="center"
            >
              {icon}
            </InputLeftElement>
          )}
          {error && typeof error.message === "string" ? (
            <InputRightElement
              width="3rem"
              height="100%"
              display="flex"
              alignItems="center"
              cursor="pointer"
            >
              <AlertCircle color="var(--deep-blood)" size="18" />
            </InputRightElement>
          ) : (
            <InputRightElement
              width="3rem"
              height="100%"
              display="flex"
              alignItems="center"
            >
              <Box onClick={handleShow} _hover={{ cursor: "pointer" }}>
                {!show ? (
                  <EyeOff size={18} color="var(--icon-dark)" />
                ) : (
                  <Eye size={18} color="var(--icon-dark)" />
                )}
              </Box>
            </InputRightElement>
          )}
        </InputGroup>
      ) : (
        <InputGroup>
          <Input
            {...register(name)}
            autoComplete="true"
            type={type}
            placeholder={placeholder}
            _placeholder={{
              fontWeight: "600",
              color: "var(--neutral)",
              fontSize: "12px",
              lineHeight: "16px",
              textTransform: "capitalize",
            }}
            {...props}
            {...inputStyle}
          />
          {icon && (
            <InputLeftElement
              width="3rem"
              height="100%"
              display="flex"
              alignItems="center"
            >
              {icon}
            </InputLeftElement>
          )}
          {error && typeof error.message === "string" && (
            <InputRightElement
              width="1.5rem"
              height="100%"
              display="flex"
              alignItems="center"
              cursor="pointer"
            >
              <AlertCircle color="var(--deep-blood)" size="18" />
            </InputRightElement>
          )}
        </InputGroup>
      )}

      {error && (
        <Text color="var(--deep-blood)" fontSize="sm" pt=".3em">
          {typeof error.message === "string"
            ? error.message
            : "An error occurred"}
        </Text>
      )}
    </FormControl>
  );
};

export const TextAreaField = ({
  name,
  label,
  radius,
  placeholder,
  labelColor,
  height,
  ...props
}: TextareaFieldProps) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormControl my="1.8em" width="100%">
      {label && (
        <FormLabel
          fontSize="16px"
          lineHeight="22px"
          fontWeight="400"
          color={labelColor || ""}
        >
          {label}
        </FormLabel>
      )}

      <Textarea
        {...register(name)}
        autoComplete="true"
        fontSize="sm"
        placeholder={placeholder}
        borderRadius={radius || "9px"}
        border="1px solid var(--input-outline)"
        _placeholder={{
          fontWeight: "400",
          color: "var(--input-placeholder)",
          fontSize: "16px",
          lineHeight: "22px",
        }}
        height={height || "200px"}
        {...props}
      />

      {error && (
        <Text color="var(--deep-blood)" fontSize="sm" pt=".3em">
          {typeof error.message === "string"
            ? error.message
            : "An error occurred"}
        </Text>
      )}
    </FormControl>
  );
};

export const CheckboxField = ({
  name,
  label,
  color = "var(--neutral)",
  fontSize = "12px",
  fontWeight = 400,
}: CheckboxFieldProps) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <>
      <Checkbox
        {...register(name)}
        size="md"
        // color={color}
        colorScheme="green"
        sx={{
          "span.chakra-checkbox__control": {
            border: "1px solid #a5c339", // Apply border only to the control
            borderRadius: "4px", // Optional: Add rounding
            fontSize,
            fontWeight,
          },
        }}
      >
        {label && (
          <Text
            color={color}
            textTransform="capitalize"
            sx={{ fontSize, fontWeight }}
          >
            {label}
          </Text>
        )}
      </Checkbox>
      {error && (
        <Text
          color="var(--coral)"
          textTransform="capitalize"
          sx={{ fontSize: "sm", fontWeight: 400, pt: ".3em" }}
        >
          {typeof error.message === "string" ? error.message : "Error"}
        </Text>
      )}
    </>
  );
};
