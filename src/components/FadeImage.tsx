"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export default function FadeImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const { className = "", alt, ...rest } = props;

  return (
    <Image
      {...rest}
      alt={alt}
      className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={(e) => {
        setLoaded(true);
        props.onLoad?.(e);
      }}
    />
  );
}
