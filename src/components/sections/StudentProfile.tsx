import { motion } from "framer-motion";

interface StudentProfileProps {
  name: string;
  sport: string;
  achievement: string;
  quote: string;
  journey: string;
  initials: string;
  imageUrl?: string;
}

export default function StudentProfile({
  name,
  sport,
  achievement,
  quote,
  journey,
  initials,
  imageUrl,
}: StudentProfileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
      className="group relative"
      data-testid={`profile-student-${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Double Bezel Outer */}
      <div className="absolute inset-0 rounded-[1.75rem] sm:rounded-[3rem] bg-white/[0.02] border border-white/[0.08] p-2" />

      {/* Double Bezel Inner Core */}
      <div className="relative rounded-[calc(1.75rem-0.5rem)] sm:rounded-[calc(3rem-0.5rem)] bg-[hsl(var(--card))] border border-white/[0.05] overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative aspect-square lg:aspect-auto min-h-64 sm:min-h-80 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={`${name} — ${sport}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent" />
              <span className="font-display text-7xl sm:text-8xl lg:text-[10rem] text-[hsl(var(--primary))]/10 select-none">
                {initials}
              </span>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg shadow-[hsl(var(--primary))]/20">
              <span className="font-display text-xs tracking-[0.2em] text-[hsl(var(--primary-foreground))]">
                {sport.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-16 flex flex-col justify-center bg-[hsl(var(--card))] relative noise-overlay">
          <div className="mb-6">
            <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] border-b border-[hsl(var(--primary))]/30 pb-1">
              NATIONAL COMPETITOR
            </span>
          </div>
          <h3 className="font-editorial text-4xl sm:text-5xl lg:text-7xl tracking-tight text-[hsl(var(--foreground))] mb-4 leading-tight italic">
            {name}
          </h3>
          <p className="text-[hsl(var(--primary))] text-sm font-medium mb-8 tracking-wide">
            {achievement}
          </p>
          <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed mb-10 max-w-[50ch]">
            {journey}
          </p>
          <div className="relative pl-8 sm:pl-10">
            <span className="absolute left-0 top-0 text-5xl sm:text-6xl font-editorial text-[hsl(var(--primary))]/20 leading-none">
              “
            </span>
            <p className="text-[hsl(var(--foreground))] text-lg sm:text-xl italic leading-relaxed font-editorial">
              {quote}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
