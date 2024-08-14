import { ApolloError } from "apollo-server-errors";
import getLoggedInUserId from "../../middleware/getLoggedInUserId";
import Job, { IJob } from "../../models/Job";

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
  },
};

export default resolvers;
