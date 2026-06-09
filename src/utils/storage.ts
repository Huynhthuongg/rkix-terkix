/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const isBrowserStorageAvailable = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export function readJsonStorage<T>(
  key: string,
  fallback: T,
  validator?: (value: unknown) => value is T,
): T {
  if (!isBrowserStorageAvailable()) {
    return fallback;
  }

  try {
    const saved = window.localStorage.getItem(key);
    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved) as unknown;
    if (validator && !validator(parsed)) {
      window.localStorage.removeItem(key);
      return fallback;
    }

    return parsed as T;
  } catch (error) {
    console.warn(`Ignoring corrupted localStorage value for ${key}:`, error);
    window.localStorage.removeItem(key);
    return fallback;
  }
}

export function readStringStorage(key: string, fallback: string): string {
  if (!isBrowserStorageAvailable()) {
    return fallback;
  }

  try {
    return window.localStorage.getItem(key) || fallback;
  } catch (error) {
    console.warn(`Unable to read localStorage value for ${key}:`, error);
    return fallback;
  }
}

export function readNumberStorage(key: string, fallback: number): number {
  const rawValue = readStringStorage(key, String(fallback));
  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function writeStorage(key: string, value: unknown): void {
  if (!isBrowserStorageAvailable()) {
    return;
  }

  try {
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.warn(`Unable to persist localStorage value for ${key}:`, error);
  }
}
