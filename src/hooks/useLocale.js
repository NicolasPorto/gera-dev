import { useLocation } from "react-router-dom";

export const LOCALES = ["pt", "en"];

export function localeFromPath(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}

export function logicalPath(pathname) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function localizePath(path, locale) {
  if (locale !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

export function useLocale() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  return {
    locale,
    logical: logicalPath(pathname),
    to: (path) => localizePath(path, locale),
  };
}
