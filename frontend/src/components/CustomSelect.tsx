import React, { ReactNode } from "react";
import { Select, Stack, Typography, SelectProps } from "@mui/material";
import { MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { colors } from "../constants";

interface CustomSelectProps extends Omit<SelectProps, "label"> {
  styles?: React.CSSProperties;
  selectStyles?: React.CSSProperties;
  dataTestId?: string;
  placeholder?: string;
  showPlaceholderAsOption?: boolean;
  label?: string;
  children?: ReactNode;
  error?: boolean;
}

const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  function CustomSelect(
    {
      styles,
      selectStyles,
      dataTestId,
      placeholder = "",
      showPlaceholderAsOption = false,
      label,
      children,
      error,
      ...props
    },
    ref
  ) {
    return (
      <Stack
        sx={{
          ...(styles && { ...styles }),
          overflow: "hidden",
        }}
        gap={"4px"}
      >
        <Select
          {...props}
          inputRef={ref}
          variant="filled"
          disableUnderline
          IconComponent={ExpandMoreIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
                maxWidth: 600,
                marginTop: 0.5,
                borderRadius: 1.5,
              },
            },
          }}
          sx={{
            fontSize: "1rem",
            borderRadius: 1.5,
            border: 0,
            backgroundColor: error ? colors.lightRed : colors.grey,
            ...(error && { color: colors.red }),
            "& .MuiSelect-select .notranslate::after": placeholder
              ? {
                  content: `"${placeholder}"`,
                  color: colors.contentTertiary,
                }
              : {},
            "& .MuiSelect-select": {
              padding: "0.75rem 1rem",
              border: 0,

              "&:focus": {
                borderRadius: 6,
                backgroundColor: "transparent",
              },
            },
            "& .MuiSelect-icon": {
              color: colors.contentTertiary,
            },
            ...(selectStyles && { ...selectStyles }),
          }}
        >
          {showPlaceholderAsOption && (
            <MenuItem title={placeholder} value="">
              <em>{placeholder}</em>
            </MenuItem>
          )}
          {children}
        </Select>
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
  }
);

export default CustomSelect;
