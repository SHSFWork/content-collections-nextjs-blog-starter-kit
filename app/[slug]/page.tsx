import Post from "@/components/post";
import { allPosts } from "content-collections";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PostPage = async ({ params }: Props) => {
  const resolvedParams = await params;

  const post = allPosts.find((p) => p._meta.path === resolvedParams.slug);
  if (!post) return notFound();

  return (
    <>
      <Post post={post} />
    </>
  );
};

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const resolvedParams = await params;

  const post = allPosts.find((p) => p._meta.path === resolvedParams.slug);
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.summary,
    // openGraph: {
    //   title: post.title,
    //   description: post.summary,
    //   type: "article",
    //   images: [
    //     {
    //       url: `/og?title=${encodeURI(post.title)}&description=${encodeURI(
    //         post.summary
    //       )}`,
    //       width: 1200,
    //       height: 630,
    //       alt: post.title,
    //     },
    //   ],
    // },
  };
};

export const dynamicParams = false;

export default PostPage;
