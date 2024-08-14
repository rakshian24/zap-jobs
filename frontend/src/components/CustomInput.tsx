import { Stack, TextField, Typography, TextFieldProps } from "@mui/material";
import React from "react";
import { colors } from "../constants";

interface CustomInputProps extends Omit<TextFieldProps, "label"> {
  styles?: React.CSSProperties;
  placeholder?: string;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomInput = React.forwardRef(function CustomInput(
  {
    styles,
    placeholder = "",
    label,
    startIcon,
    endIcon,
    type,
    error,
    inputProps,
    ...props
  }: CustomInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <Stack
      sx={{
        ...(styles && { ...styles }),
      }}
      gap={"4px"}
    >
      <TextField
        {...props}
        type={type}
        placeholder={placeholder}
        variant="outlined"
        inputRef={ref}
        sx={{
          input: {
            ...(error && { color: colors.red }),
            "&::placeholder": {
              color: colors.contentTertiary,
              padding: 0,
              opacity: 1,
            },
          },
        }}
        InputProps={{
          ...(startIcon && {
            startAdornment: (
              <Stack color={colors.contentTertiary} sx={{ pl: 2 }}>
                {startIcon}
              </Stack>
            ),
          }),
          ...(endIcon && {
            endAdornment: (
              <Stack color={colors.contentTertiary} sx={{ pr: 2 }}>
                {endIcon}
              </Stack>
            ),
          }),
          inputProps: {
            style: {
              padding: "0.75rem 1rem",
              borderRadius: "24px 0 0 24px",
              border: 0,
            },
            ...inputProps,
          },
          sx: {
            fontSize: "1rem",
            padding: 0,
            borderRadius: 1.5,
            backgroundColor: error ? colors.lightRed : "none",
            "& textarea::placeholder": {
              color: colors.contentTertiary,
              padding: 0,
              opacity: 1,
            },
          },
        }}
      />
      <Typography
        sx={{
          px: 1,
          color: error ? colors.red : colors.contentSecondary,
          fontSize: "12px",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
});

export default CustomInput;
