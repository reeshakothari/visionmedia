"use client";

import { createElement } from "react";
import { useEditable } from "./context";

type FieldProps = {
  path: string;
  value: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
};

// Renders `value` untouched when there's no editor context (the public
// site). Inside the admin content editor, it instead reads/writes the live
// draft at `path` and becomes an inline-editable element. Only committing on
// blur (not on every keystroke) keeps the caret stable while typing, since
// contentEditable + React re-renders don't mix well otherwise.
export function Field({ path, value, as = "span", className }: FieldProps) {
  const ctx = useEditable();

  if (!ctx) {
    return createElement(as, { className }, value);
  }

  const current = (ctx.get(path) as string | undefined) ?? value;

  return createElement(as, {
    className: `${className ?? ""} editable-hint`.trim(),
    contentEditable: true,
    suppressContentEditableWarning: true,
    "data-editable-path": path,
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      const text = e.currentTarget.textContent ?? "";
      if (text !== current) ctx.set(path, text);
    },
    key: path,
  }, current);
}
