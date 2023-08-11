import { prisma } from "../../db/client";

export default eventHandler(async (event) => {
  const { userId } = getQuery(event);
  // if (!userId) {
  //   throw new Error("User not found");
  // }
  const watchlaterMovies = await prisma?.watchLaterMovie.findMany({
    where: {
      userId: userId as string,
    },
  });

  return watchlaterMovies;
});
