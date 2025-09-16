import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { isSupabaseConfigured } from '../Supabase/Supabase';

export default function ProtectedRoute({ children }){
  const { user, loading } = useAuth();
  // while loading, render nothing (or a loader)
  if (loading) return null;
  // if supabase is not configured, allow guest access
  if (!isSupabaseConfigured) return children;
  // if supabase configured and no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
