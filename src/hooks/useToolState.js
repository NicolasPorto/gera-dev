import { useState, useEffect } from "react";

const PREFIX = "geradev:io:";
const hasWindow = typeof window !== "undefined";

const encode = (s) => btoa(unescape(encodeURIComponent(s)));
const decode = (s) => decodeURIComponent(escape(atob(s)));

function readShare(param) {
  if (!hasWindow || !param) return null;
  const raw = new URLSearchParams(window.location.search).get(param);
  if (raw == null) return null;
  try {
    return decode(raw);
  } catch {
    return null;
  }
}

export function useToolState(key, initial = "", { shareParam } = {}) {
  const storageKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    if (!hasWindow) return initial;
    const shared = readShare(shareParam);
    if (shared != null) return shared;
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved != null ? saved : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    if (!hasWindow) return;
    try {
      if (value === "" || value == null) window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, value);
    } catch {
      /* quota cheia / modo privado: ignora */
    }
  }, [storageKey, value]);

  // Monta o link compartilhável com o valor atual codificado na URL.
  const getShareUrl = () => {
    if (!hasWindow) return "";
    const url = new URL(window.location.href);
    if (shareParam && value) url.searchParams.set(shareParam, encode(value));
    else if (shareParam) url.searchParams.delete(shareParam);
    return url.toString();
  };

  return [value, setValue, getShareUrl];
}
