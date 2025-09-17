import { createClient } from "@supabase/supabase-js";

// Read Supabase configuration from environment variables.
// For Vite, set them in an .env file as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
	? createClient(supabaseUrl, supabaseAnonKey)
	: null;

// Helper: simple fallback storage for guest mode or missing Supabase
export const localStorageKey = "sih_trips_v1";

export function saveTripLocally(trip) {
	try {
		const existing = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
		existing.push(trip);
		localStorage.setItem(localStorageKey, JSON.stringify(existing));
		return true;
	} catch (e) {
		console.error("Failed saving trip locally", e);
		return false;
	}
}