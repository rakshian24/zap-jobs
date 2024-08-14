import userResolvers from "./users";
import jobResolvers from "./job";

export default {
  Query: {
    ...userResolvers.Query,
    ...jobResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...jobResolvers.Mutation,
  },
};
