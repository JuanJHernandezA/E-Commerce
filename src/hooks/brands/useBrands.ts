import { getBrands } from "../../actions"
import { useQuery} from '@tanstack/react-query'
import { useAdminAuth } from "../auth/useAdminAuth";



export const useBrands = ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
  const { isAdmin, isLoading: isLoadingAuth } = useAdminAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['brands', page, limit,isAdmin],
    queryFn: () => getBrands(page, limit, isAdmin),
    staleTime: 1000 * 60 * 5,
    enabled: !isLoadingAuth,
  });

  return {
    brands: data?.brands ?? [],
    isLoadingBrands: isLoading,
    totalBrands: data?.count ?? 0,
  };
};

