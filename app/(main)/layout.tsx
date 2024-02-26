export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center bg-white dark:bg-black">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a8a82e_1px,transparent_1px),linear-gradient(to_bottom,#a8a8a82e_1px,transparent_1px)] dark:bg-[size:4rem_4rem] dark:[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]" />
      <div className="z-10 flex h-full w-full justify-center">{children}</div>
    </section>
  );
}
