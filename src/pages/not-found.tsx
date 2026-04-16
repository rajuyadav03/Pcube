export default function NotFound() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <span className="font-display text-xs tracking-[0.2em] text-[hsl(var(--primary))] uppercase bg-[hsl(var(--primary))]/10 px-3 py-1 rounded-full border border-[hsl(var(--primary))]/20 mb-6 inline-block">
          Error 404
        </span>
        <h1 className="font-display text-[clamp(4rem,10vw,8rem)] tracking-tighter text-[hsl(var(--foreground))] mt-2 leading-[0.85] uppercase">
          PAGE NOT
          <br />
          <span className="text-[hsl(var(--muted-foreground))]">FOUND</span>
        </h1>
        <p className="mt-8 text-[hsl(var(--muted-foreground))] text-lg max-w-xl mx-auto font-editorial italic lg:text-2xl">
          The page you are looking for has either moved or been removed entirely.
        </p>
        <a
          href="/"
          className="inline-block mt-12 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-display tracking-widest text-sm px-8 py-4 uppercase hover:brightness-110 transition-all"
        >
          Return to Base →
        </a>
      </div>
    </main>
  );
}
