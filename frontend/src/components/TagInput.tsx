import React, { useState, useEffect } from "react";
import { TextField, Chip, Stack, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { colors } from "../constants";

interface TagInputProps {
  placeholder?: string;
  onTagsChange?: (tags: string[]) => void;
  label?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  placeholder,
  onTagsChange,
  label,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    } else if (
      event.key === "Backspace" &&
      inputValue === "" &&
      tags.length > 0
    ) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const handleDelete = (tagToDelete: string) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  useEffect(() => {
    if (onTagsChange) {
      onTagsChange(tags);
    }
  }, [tags, onTagsChange]);

  return (
    <Stack gap={0.5}>
      <TextField
        variant="filled"
        placeholder={tags.length === 0 ? placeholder || "" : ""}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
            >
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={handleDelete(tag)}
                  deleteIcon={<CloseOutlined />}
                  sx={{
                    margin: "2px 0",
                    bgcolor: colors.lightBrown,
                    color: colors.white,
                    fontWeight: "500",
                  }}
                />
              ))}
            </Stack>
          ),
          sx: {
            borderRadius: "16px",
            border: "none",
            outline: "none",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            "& .MuiChip-root": {
              marginRight: "4px",
            },
            "& .MuiInputBase-input": {
              flex: 1,
              minWidth: "30px",
              p: 0,
              "&::placeholder": {
                color: colors.contentTertiary,
                padding: 0,
                opacity: 1,
              },
            },
          },
        }}
      />
      {label && (
        <Typography
          sx={{ pl: 2, fontSize: 12, color: colors.contentSecondary }}
        >
          {label}
        </Typography>
      )}
    </Stack>
  );
};

export default TagInput;
