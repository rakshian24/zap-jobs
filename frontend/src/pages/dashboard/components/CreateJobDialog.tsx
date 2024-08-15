import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import { screenSize } from "../../../constants";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ICreateJobFormValueTypes, InitCreateJobFormValues } from "./helper";
import { CREATE_JOB } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import CustomSnackBar from "../../../components/CustomSnackBar";
import CustomInput from "../../../components/CustomInput";
import { NumberRegex, textInputRegex } from "../../../utils";
import ErrorBox from "../../../components/ErrorBox";
import TagInput from "../../../components/TagInput";
import Button from "../../../components/CustomButton";

type Props = {
  handleClose: () => void;
  open: boolean;
  onJobCreated: () => void;
};

const CreateJobDialog = ({ open, handleClose, onJobCreated }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [jobRequirements, setJobRequirements] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: { ...InitCreateJobFormValues },
    mode: "onChange",
  });

  const [createJob, { loading: isCreateJobLoading }] = useMutation(CREATE_JOB);

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };
  const isFormDisabled = !formState.isValid;

  const onSubmitHandler = async (formValues: ICreateJobFormValueTypes) => {
    setIsLoading(true);

    try {
      await createJob({
        variables: {
          jobInput: {
            ...formValues,
            requirements: [...jobRequirements],
            tags: [...tags],
            salaryPerHour: parseInt(formValues?.salaryPerHour.toString()),
          },
        },
      });
      setSnackbarMessage("Job created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      onJobCreated();

      handleClose();
      reset({
        ...InitCreateJobFormValues,
      });
    } catch (error) {
      console.error("Error while creating job: ", error);

      setSnackbarMessage("Something went wrong!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <CustomSnackBar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <Dialog
        fullScreen={isTablet}
        fullWidth
        maxWidth={"sm"}
        PaperProps={{
          style: {
            borderRadius: !isTablet ? "32px" : "0",
          },
        }}
        open={open}
      >
        <Stack
          component={"form"}
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <DialogContent
            dividers
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 5,
              pb: 1,
              ...(isTablet && { px: 2, pt: 3 }),
              gap: 4,
              borderBottom: "none",
            }}
          >
            <DialogTitle sx={{ p: 0 }}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontSize={isTablet ? 24 : 28} fontWeight={700}>
                  {"Create Job"}
                </Typography>
                <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
                  <CloseOutlined />
                </IconButton>
              </Stack>
            </DialogTitle>
            <Stack gap={2}>
              <Controller
                name="title"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                  pattern: {
                    value: textInputRegex,
                    message: "Invalid characters",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    {...field}
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    placeholder="Enter job title"
                    label="Job title"
                    dataTestId="jobTitle"
                  />
                )}
              />
              <Controller
                name="description"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                  pattern: {
                    value: textInputRegex,
                    message: "Invalid characters",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    minRows={2}
                    {...field}
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    placeholder="Enter job description"
                    label="Job Description"
                    dataTestId="jobDescription"
                  />
                )}
              />
              <TagInput
                onTagsChange={(newJobRequirements) =>
                  setJobRequirements(newJobRequirements)
                }
                label="Job requirements"
                placeholder="Enter job requirements"
                dataTestId="jobRequirements"
              />

              <TagInput
                onTagsChange={(newTags) => setTags(newTags)}
                label="Tags"
                placeholder="Enter tags"
                dataTestId="tags"
              />

              <Stack
                direction={isTablet ? "column" : "row"}
                gap={isTablet ? 2 : 3}
              >
                <Controller
                  name="companyName"
                  {...COMMON_PROPS}
                  rules={{
                    required: true,
                    pattern: {
                      value: textInputRegex,
                      message: "Invalid characters",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomInput
                      {...field}
                      error={error !== undefined}
                      styles={{ width: "100%" }}
                      placeholder="Enter company name"
                      label="Company name"
                      dataTestId="companyName"
                    />
                  )}
                />
                <Controller
                  name="contactInfo"
                  {...COMMON_PROPS}
                  rules={{
                    required: true,
                    pattern: {
                      value: textInputRegex,
                      message: "Invalid characters",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomInput
                      {...field}
                      error={error !== undefined}
                      styles={{ width: "100%" }}
                      placeholder="Enter contact info"
                      label="Contact info"
                      dataTestId="contactInfo"
                    />
                  )}
                />
              </Stack>

              <Controller
                name="salaryPerHour"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                  pattern: {
                    value: NumberRegex,
                    message: `Invalid number`,
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    {...field}
                    type="number"
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    placeholder={"Enter salary per hour"}
                    label={"Salary/hr"}
                    endIcon={<>$</>}
                    inputProps={{
                      min: "0",
                    }}
                    dataTestId="salaryPerHr"
                  />
                )}
              />
              <ErrorBox formState={formState} style={{ mb: 2 }} />
            </Stack>
          </DialogContent>
          <Box
            sx={{
              py: isTablet ? 0 : 2,
              px: isTablet ? 2 : 5,
              pb: 5,
              justifyContent: "flex-start",
            }}
          >
            <Button
              buttonText={"Create"}
              endIcon={<AddOutlined />}
              isLoading={isLoading || isCreateJobLoading}
              disabled={isFormDisabled}
              onClick={() => onSubmitHandler}
            />
          </Box>
        </Stack>
      </Dialog>
    </>
  );
};

export default CreateJobDialog;
