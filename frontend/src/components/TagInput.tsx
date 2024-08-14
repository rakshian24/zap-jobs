import React, { useState, useEffect } from "react";
import { TextField, Chip, Stack } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { colors } from "../constants";

interface TagInputProps {
  placeholder?: string;
  onTagsChange?: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  placeholder = "Enter skills",
  onTagsChange,
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
    <TextField
      variant="outlined"
      placeholder={tags.length === 0 ? placeholder : ""}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      fullWidth
      InputProps={{
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
                deleteIcon={<CloseIcon />}
                sx={{ margin: "2px 0" }}
              />
            ))}
          </Stack>
        ),
        sx: {
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
  );
};

export default TagInput;
