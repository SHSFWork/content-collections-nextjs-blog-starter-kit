"use client";

import { MDXContent } from "@content-collections/mdx/react";
import { HTMLAttributes, ReactNode } from "react";
import ContentSection from "./content-section";
import MarkdownImage from "./markdown-image";
import Pre from "@/components/pre";

type Props = {
  code: string;
};

type HeadingProps = {
  id?: string;
  children?: ReactNode;
};

const heading = (As: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
  const Heading = ({ id, children }: HeadingProps) => (
    <a href={`#${id}`} className="no-underline focus-visible:ring-0">
      <As id={id}>{children}</As>
    </a>
  );
  Heading.displayName = As;
  return Heading;
};

const Markdown = ({ code }: Props) => {
  return (
    <ContentSection>
      <MDXContent
        code={code}
        components={{
          pre: Pre,
          img: MarkdownImage,

          h1: heading("h1"),
          h2: heading("h2"),
          h3: heading("h3"),
          h4: heading("h4"),
          h5: heading("h5"),
          h6: heading("h6"),

          code: (props: HTMLAttributes<HTMLElement>) => {
            return <code className="!border-0" {...props} />;
          },
        }}
      />
    </ContentSection>
  );
};

export default Markdown;
