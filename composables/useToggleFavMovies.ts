import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { useToast } from "vue-toastification";

type param = {
  movieProps: {
    backdrop_path: string;
    homepage: string;
    title: string;
    movieId: number;
    original_title: string;
    popularity: string;
    poster_path: string;
    tagline: string;
    vote_average: string;
    vote_count: string;
    userId: string;
  };
};

export const useToggleFavMovie = () => {
  const toast = useToast();
  const toggleFav = async (param: param) => {
    try {
      return await axios.post("/api/favorite/favorite", {
        movieProps: param.movieProps,
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return useMutation({
    mutationKey: ["toggle-add-favorite"],
    mutationFn: toggleFav,
  });
};

export const useToggleWatchLaterMovie = () => {
  const toast = useToast();
  const toggleWatchLater = async (param: param) => {
    try {
      return await axios.post("/api/watchlater/watchlater", {
        movieProps: param.movieProps,
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return useMutation({
    mutationKey: ["toggle-add-watchlater"],
    mutationFn: toggleWatchLater,
  });
};
