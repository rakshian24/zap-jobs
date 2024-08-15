import { ApolloError } from "apollo-server-errors";
import getLoggedInUserId from "../../middleware/getLoggedInUserId";
import Job, { IJob } from "../../models/Job";
import User from "../../models/User";
import { Types } from "mongoose";

interface JobInput {
  title: string;
  description: string;
  requirements: [string];
  tags: [string];
  companyName: string;
  contactInfo: string;
  salaryPerHour: number;
}

const resolvers = {
  Mutation: {
    async createJob(
      _: unknown,
      {
        jobInput: {
          title,
          description,
          requirements,
          tags,
          companyName,
          contactInfo,
          salaryPerHour,
        },
      }: { jobInput: JobInput },
      ctx: any
    ): Promise<IJob> {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      if (!userId) {
        throw new ApolloError("User not authenticated", "NOT_AUTHENTICATED");
      }

      const newJob = new Job({
        title,
        description,
        requirements,
        tags,
        companyName,
        contactInfo,
        salaryPerHour,
        postedBy: userId,
      });

      const res = (await newJob.save()).toObject() as IJob;

      return res;
    },
    async applyForJob(
      _: unknown,
      { jobId }: { jobId: string },
      ctx: any
    ): Promise<IJob> {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      if (!userId) {
        throw new ApolloError("User not authenticated", "NOT_AUTHENTICATED");
      }

      const job = await Job.findByIdAndUpdate(
        jobId,
        { $push: { applicants: userId } },
        { new: true }
      );

      await User.findByIdAndUpdate(userId, { $push: { jobsApplied: jobId } });

      const jobObject = job?.toObject() as IJob;
      const userObjectId = new Types.ObjectId(userId);

      const isAppliedByCurrentUser =
        jobObject?.applicants?.some((applicant) => {
          if (!Types.ObjectId.isValid(applicant._id)) {
            return false;
          }
          const applicantObjectId = new Types.ObjectId(applicant._id);

          return applicantObjectId.equals(userObjectId);
        }) || false;

      return {
        ...jobObject,
        isAppliedByCurrentUser,
      };
    },
  },
  Query: {
    async myJobs(_: unknown, args: {}, ctx: any): Promise<IJob[] | null> {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      if (!userId) {
        throw new ApolloError("User not authenticated", "NOT_AUTHENTICATED");
      }

      const myJobs = await Job.find({ postedBy: userId });

      const jobsAsObjects = myJobs.map((job) => job.toObject()) as IJob[];

      return jobsAsObjects;
    },
    async getAllJobs(
      _: unknown,
      { skill, minSalary }: { skill: string[]; minSalary: number },
      ctx: any
    ): Promise<(IJob & { isAppliedByCurrentUser: boolean })[]> {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      if (!userId) {
        throw new ApolloError(
          "User not authenticated or invalid user ID",
          "NOT_AUTHENTICATED"
        );
      }

      const query: any = {};

      if (skill?.length > 0) {
        query.tags = { $in: skill };
      }

      if (minSalary !== undefined) {
        query.salaryPerHour = { $gte: minSalary };
      }

      const jobs = await Job.find(query)
        .populate("postedBy")
        .populate("applicants");

      const userObjectId = new Types.ObjectId(userId);

      const jobsWithAppliedStatus = jobs.map((job) => {
        const jobObject = job.toObject() as IJob;

        const isAppliedByCurrentUser =
          jobObject?.applicants?.some((applicant) => {
            if (!Types.ObjectId.isValid(applicant._id)) {
              return false;
            }
            const applicantObjectId = new Types.ObjectId(applicant._id);

            return applicantObjectId.equals(userObjectId);
          }) || false;

        return {
          ...jobObject,
          isAppliedByCurrentUser,
        };
      });

      return jobsWithAppliedStatus;
    },
  },
};

export default resolvers;
