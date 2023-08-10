export default eventHandler(async (event) => {
  const { userId } = getQuery(event);
  // if (!userId) {
  //   throw new Error("User not found");
  // }
  const favoriteMovies = await prisma?.favoriteMovie.findMany({
    where: {
      userId: userId as string,
    },
  });
  console.log({ favoriteMovies });

  return favoriteMovies;
});
