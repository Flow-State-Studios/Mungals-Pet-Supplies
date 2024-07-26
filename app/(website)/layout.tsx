import Nav from "@/components/nav/nav";

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className={``}>
          {children}
      </main>
    </>
  );
}
