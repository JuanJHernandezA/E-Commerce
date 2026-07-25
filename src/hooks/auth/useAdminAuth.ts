import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { getUserRole } from "../../actions";

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const checkRole = async () => {
      setIsLoadingAuth(true);

      // 1. Obtener sesión actual
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setIsAdmin(false);
        setIsLoadingAuth(false);
        return;
      }

      // 2. Obtener rol del usuario
      const role = await getUserRole(session.user.id);

      setIsAdmin(role === "admin");
      setIsLoadingAuth(false);
    };

    checkRole();

    // 3. Escuchar cierres de sesión en tiempo real
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isLoading: isLoadingAuth };
};