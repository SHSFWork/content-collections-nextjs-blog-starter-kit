import { type Post, allPosts } from "content-collections";
import { compareDesc } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import DateTime from "./date-time";
import Markdown from "./markdown";
import ScrollToTop from "./scroll-to-top";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  post: Post;
};

const createPrevAndNext = (post: Post) => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const index = posts.findIndex((p) => p === post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index + 1 < posts.length ? posts[index + 1] : null;
  return {
    next,
    prev,
  };
};

type NavigationButtonProps = {
  post: Post | null;
  type: "prev" | "next";
};

const NavigationButton = ({ post, type }: NavigationButtonProps) => {
  if (!post) {
    return <div />;
  }
  const Icon = type === "next" ? ChevronRight : ChevronLeft;
  return (
    <Button variant="outline" className="border-dashed">
      <Link
        className={cn("flex w-full items-center justify-start gap-2", {
          "text-left": type === "prev",
          "flex-row-reverse text-right": type === "next",
        })}
        href={post.url}
        title={`Navigate to post "${post.title}"`}
      >
        <Icon className="w-6 shrink-0" />
        <span className="hidden md:block">{post.title}</span>
      </Link>
    </Button>
  );
};

const Post = ({ post }: Props) => {
  const { next, prev } = createPrevAndNext(post);
  return (
    <article className="space-y-4">
      <div className="border-b border-dashed py-4 space-y-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex justify-between text-xs">
          <p>{post.readingTime}</p>
          <DateTime title="Posted at" value={post.date} />
        </div>
      </div>

      <Markdown code={post.content.mdx} />

      <nav className="my-5 grid grid-cols-3 place-items-center border-t border-t-base-300 pt-4 dark:border-t-base-700">
        <NavigationButton type="prev" post={prev} />
        <ScrollToTop />
        <NavigationButton type="next" post={next} />
      </nav>
    </article>
  );
};

export default Post;
