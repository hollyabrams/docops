import ApiLayout from "@/components/ApiLayout/ApiLayout";

export default function Api({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApiLayout>{children}</ApiLayout>;
}
