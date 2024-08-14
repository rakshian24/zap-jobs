import userResolvers from "./users";
import jobResolvers from "./job";

export default {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...jobResolvers.Mutation,
  },
};
