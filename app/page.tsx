import { allPosts } from "content-collections";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <section id="info" className="space-y-4">
        <h1 className="text-3xl font-semibold">Welcome to the Blog</h1>
        <p className="text-lg text-muted-foreground">
          This is a simple blog built with Next.js and Content Collections.
          Explore the latest posts and articles.
        </p>
      </section>

      <section id="posts" className="py-8">
        <ul className="space-y-4 ">
          {allPosts.map((post) => (
            <li key={post._meta.path}>
              <Link href={post.url}>
                <Card>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.summary}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
