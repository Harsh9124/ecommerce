
export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="container mx-auto px-4 flex-grow">{children}</main>
}
