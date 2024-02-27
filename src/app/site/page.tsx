export default function Home() {
  return (
    <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
      <p className="text-center">Run your Agency, in one Place.</p>
      <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
        <h1 className="text-9xl font-bold text-center md:text-[300px]">
          Lark
        </h1>
      </div>
      <h1 className="text-center text-6xl font-writing -mt-8">Creator</h1>
    </section>
  );
}
