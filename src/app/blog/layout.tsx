import BlogLayout from "@/components/BlogLayout/BlogLayout";

export default function Blog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlogLayout>{children}</BlogLayout>;
}
