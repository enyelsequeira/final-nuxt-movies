import { prisma } from "../../db/client";

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
      message: "Please log in to add to watch later",
    }),
  }),
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Check if userId is present in the body, if not return an error
  if (!body?.movieProps?.userId || body?.movieProps?.userId === "undefined") {
    return createError({
      statusCode: 401,
      statusMessage: "Please log in to add to watch later",
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
    const movie = await prisma?.watchLaterMovie.findUnique({
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
      await prisma?.watchLaterMovie.delete({
        where: {
          userId_movieId: {
            userId: parsedBody.data.movieProps.userId,
            movieId: parsedBody.data.movieProps.movieId,
          },
        },
      });
      return {
        message: "Movie removed from watch later",
      };
    } else {
      // add movie to favorite
      await prisma?.watchLaterMovie.create({
        data: {
          ...parsedBody.data.movieProps,
        },
      });
      return {
        message: "Movie added to watch later",
      };
    }
  } catch (error) {
    return createError({
      statusCode: 401,
      statusMessage: "Error toggling watch later status",
    });
  }
});
