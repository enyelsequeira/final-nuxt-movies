import { z } from "zod";

const schema = z.object({
  movieProps: z.object({
    backdrop_path: z.string(),
    homepage: z.string(),
    title: z.string(),
    movieId: z.number(),
    original_title: z.string(),
    popularity: z.string(),
    poster_path: z.string(),
    tagline: z.string(),
    vote_average: z.string(),
    vote_count: z.string(),
    userId: z.string().refine((value) => value !== "undefined", {
      message: "Please log in to add to favorites",
    }),
  }),
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Check if userId is present in the body, if not return an error
  if (!body?.movieProps?.userId || body?.movieProps?.userId === "undefined") {
    return createError({
      statusCode: 401,
      statusMessage: "Please log in to add to favorites",
    });
  }
  const parsedBody = schema.safeParse(body);
  // we could do some better error handling here...
  if (!parsedBody.success) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  try {
    const movie = await prisma?.favoriteMovie.findUnique({
      where: {
        userId_movieId: {
          userId: parsedBody.data.movieProps.userId,
          movieId: parsedBody.data.movieProps.movieId,
        },
      },
    });

    // check if movie exists
    if (movie) {
      // delete movie from favorite
      await prisma?.favoriteMovie.delete({
        where: {
          userId_movieId: {
            userId: parsedBody.data.movieProps.userId,
            movieId: parsedBody.data.movieProps.movieId,
          },
        },
      });
      return {
        message: "Movie removed from favorites",
      };
    } else {
      // add movie to favorite
      await prisma?.favoriteMovie.create({
        data: {
          ...parsedBody.data.movieProps,
        },
      });
      return {
        message: "Movie added to favorites",
      };
    }
  } catch (error) {
    return createError({
      statusCode: 401,
      statusMessage: "Error toggling favorite status",
    });
  }
});
