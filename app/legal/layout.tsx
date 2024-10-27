import DarkNav from "@/components/nav/dark-nav";


export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DarkNav />
      <main className={``}>
          {children}
      </main>
    </>
  );
}
