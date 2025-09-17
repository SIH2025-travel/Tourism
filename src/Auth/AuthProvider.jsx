import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../Supabase/Supabase';

const AuthContext = createContext({ user: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // signOut helper
  async function signOut(){
    if (!isSupabaseConfigured || !supabase) {
      // fallback: just clear user locally
      setUser(null);
      return true;
    }
    try{
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error', error);
        return false;
      }
      setUser(null);
      return true;
    }catch(e){
      console.error('Sign out failed', e);
      return false;
    }
  }

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      setUser(null);
      return;
    }

    // check current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user ?? null);
      setLoading(false);
    }).catch(() => setLoading(false));

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}
