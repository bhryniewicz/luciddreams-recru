import { FormulaOption } from "@/types/formula";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (searchValue: string) => {
  const { data, isLoading } = useQuery<FormulaOption[]>({
    queryKey: ["data", searchValue],
    queryFn: async () => {
      const res = await fetch(`/api/search?searchValue=${searchValue}`); // Call the API route handler
      if (!res.ok) {
        throw new Error("Error fetching filtered options");
      }
      return res.json();
    },
    enabled: !!searchValue,
  });

  return { data, isLoading };
};
