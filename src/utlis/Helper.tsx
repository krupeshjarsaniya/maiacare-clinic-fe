import Cookies from "universal-cookie";
import { AppDispatch } from "./redux/store";

const cookies = new Cookies();

/**
 * Get the auth token from cookies
 */
export const getTokenFromCookie = (): string | undefined => {
  const token = cookies.get("token");
  console.log("Cookie token:", token);
  return token;
};

/**
 * Set the auth token in cookies
 */
export const setTokenInCookie = (token: string) => {
  cookies.set("token", token, {
    path: "/", // accessible throughout the site
    sameSite: "lax", // ✅ lowercase for TypeScript
    // secure: true,   // enable in HTTPS
    maxAge: 7 * 24 * 60 * 60, // optional - 7 days
  });
};

/**
 * Remove the token cookie
 */
export const removeTokenCookie = () => {
  cookies.remove("token", { path: "/" });
};

/**
 * Clear all stored user data (Redux + LocalStorage + Cookie)
 */
export const ClearData = () => {
  try {
    removeTokenCookie();

    console.log("All user data cleared.");
  } catch (err) {
    console.error("Error clearing data:", err);
  }
};

// date changer
// export const formatDateTime = (date: string | Date) => {
//   const d = new Date(date);
//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();

//   const hours = String(d.getHours()).padStart(2, "0");
//   const minutes = String(d.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// };
export function formatDateTime(isoDate: string | Date): string {
  if (!isoDate) return "";

  const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;
  if (isNaN(date.getTime())) return "";

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${weekday}, ${day} ${month} ${year}`;
}
export function parseDateDDMMYYYY(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Accept both "-" or "/" as separators
  const parts = dateStr.includes("-") ? dateStr.split("-") : dateStr.split("/");

  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  return new Date(year, month, day);
}
