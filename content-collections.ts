import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import { promisify } from "node:util";
import { exec as syncExec } from "node:child_process";
import path from "node:path";
import staticImages from "@/lib/staticImages";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";

const POST_DIRECTORY = "posts";

const exec = promisify(syncExec);

function calculateReadingTime(content: string) {
  const contentWithoutSvg = content.replace(/<svg[\s\S]+?<\/svg>/g, "");
  return readingTime(contentWithoutSvg).text;
}

async function lastModificationDate(filePath: string) {
  const { stdout } = await exec(
    `git log -1 --format=%ai -- ${path.join(POST_DIRECTORY, filePath)}`
  );
  if (stdout) {
    return new Date(stdout.trim()).toISOString();
  }
  return new Date().toISOString();
}

const posts = defineCollection({
  name: "posts",
  directory: POST_DIRECTORY,
  include: "*/index.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
  }),
  transform: async (post, ctx) => {
    const mdx = await compileMDX(ctx, post, {
      files: (appender) => {
        const directory = path.join(
          POST_DIRECTORY,
          post._meta.directory,
          "components"
        );
        appender.directory("./components", directory);
      },
      rehypePlugins: [
        rehypeSlug,
        [
          staticImages,
          {
            publicDir: path.join("public", "posts"),
            resourcePath: "/posts",
            sourceRoot: POST_DIRECTORY,
          },
        ],
        // Rehype Pretty Code eklemeleri
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;
              if (codeEl.tagName !== "code") return;
              node.__rawString__ = codeEl.children?.[0].value;
            }
          });
        },
        [
          rehypePrettyCode,
          {
            theme: "one-dark-pro",
            keepBackground: false,
            onVisitLine(node: {
              children: Array<{ type: string; value: string }>;
            }): void {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
          },
        ],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "figure") {
              if (!("data-rehype-pretty-code-figure" in node.properties)) {
                return;
              }
              const preElement = node.children.at(-1);
              if (preElement.tagName !== "pre") {
                return;
              }
              preElement.properties["__rawString__"] = node.__rawString__;
            }
          });
        },
      ],
      remarkPlugins: [remarkGfm],
    });

    const lastModification = await ctx.cache(
      post._meta.filePath,
      lastModificationDate
    );

    return {
      ...post,
      content: {
        mdx,
        raw: post.content,
      },
      readingTime: calculateReadingTime(post.content),
      lastModification,
      url: `/${post._meta.path}`,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
