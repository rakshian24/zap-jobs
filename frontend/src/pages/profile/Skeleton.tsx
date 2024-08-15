import { SkeletonProps, Stack, useMediaQuery } from "@mui/material";
import CommonSkeleton from "../../components/CommonSkeleton";
import { screenSize } from "../../constants";

const ProfileSkeleton = ({ height, sx }: SkeletonProps) => (
  <CommonSkeleton height={height} sx={{ borderRadius: 6, ...sx }} />
);

const Skeleton = () => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  return (
    <Stack gap={isTablet ? 3 : 4}>
      <ProfileSkeleton height={150} sx={{ borderRadius: isTablet ? 3 : 6 }} />
      <ProfileSkeleton height={150} sx={{ borderRadius: isTablet ? 3 : 6 }} />
      <ProfileSkeleton height={350} sx={{ borderRadius: isTablet ? 3 : 6 }} />
    </Stack>
  );
};

export default Skeleton;
