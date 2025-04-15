import { absoluteUrl } from "@/lib/absoluteURL";
import { Metadata } from "next";

export function constructMetadata({
  title = "Blog",
  description = "Welcome to my blog!",
  image,
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  const defaultImage = absoluteUrl(
    `/og?title=${encodeURI(title)}&description=${encodeURI(description)}`
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    ...props,
  };
}
