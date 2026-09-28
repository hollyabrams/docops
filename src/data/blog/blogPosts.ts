export type BlogPost = {
  title: string;
  href: string;
  date: string;
  description: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "More Than the Words",
    href: "/blog/more-than-the-words",
    date: "September 27, 2026",
    description:
      "How writing, systems thinking, and software engineering came together in the work I love.",
  },
];
