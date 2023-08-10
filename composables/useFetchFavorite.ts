import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { PrismaMovies } from "~/types";

const getMoviesLikedByUserId = async (userId: string) => {
  try {
    const response = await axios.get<PrismaMovies[]>(`/api/favorite/favorite`, {
      params: {
        userId,
      },
    });
    return response;
  } catch (error: any) {
    console.log(error.response.data.message || "Something went wrong");
  }
};

export const useFetchFavorite = (userId: string) => {
  const { data } = useAuth();
  return useQuery({
    queryKey: ["get-movies-liked-by-user-id", data.value?.user.id],
    queryFn: async () => await getMoviesLikedByUserId(userId as string),
    enabled: !!data.value?.user.id,
  });
};

const getWatchLaterMovies = async (userId: string) => {
  try {
    const response = await axios.get<PrismaMovies[]>(
      `/api/watchlater/watchlater`,
      {
        params: {
          userId,
        },
      },
    );
    return response;
  } catch (error: any) {
    console.log(error.response.data.message || "Something went wrong");
  }
};

export const useFetchWatchLater = (userId: string) => {
  const { data } = useAuth();
  return useQuery({
    queryKey: ["get-watchlater-by-user-id", data.value?.user.id],
    queryFn: async () => await getWatchLaterMovies(userId as string),
    enabled: !!data.value?.user.id,
  });
};
