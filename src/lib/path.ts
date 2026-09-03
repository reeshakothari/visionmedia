// Minimal lodash-style get/set for dot-notation paths (supports numeric
// array indices, e.g. "hero.images.0.src"). Used to read/write a single
// field inside the in-memory draft object the content editor works on.

export function getPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

export function setPath<T>(obj: T, path: string, value: unknown): T {
  const parts = path.split(".");
  const clone = (v: unknown) => (Array.isArray(v) ? [...v] : { ...(v as object) });
  const root: Record<string, unknown> = clone(obj) as Record<string, unknown>;
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    cur[key] = clone(cur[key] ?? {});
    cur = cur[key] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = value;
  return root as T;
}
