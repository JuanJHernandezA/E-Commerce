import { getCategories } from "../../actions"
import { useQuery} from '@tanstack/react-query'

import { useAdminAuth } from "../auth/useAdminAuth";

export const useCategories = ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
  const { isAdmin, isLoading: isLoadingAuth } = useAdminAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['categories', page, limit, isAdmin],
    queryFn: () => getCategories(page, limit, isAdmin),
    staleTime: 1000 * 60 * 5,
    enabled: !isLoadingAuth,
  });

  return {
    categories: data?.categories ?? [],
    isLoadingCategories: isLoading,
    totalCategories: data?.count ?? 0,
  };
};



