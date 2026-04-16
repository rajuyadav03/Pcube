import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProgramCardProps {
  sport: string;
  description: string;
  status: "active" | "expanding";
  icon: string;
  accentColor?: string;
  imageUrl?: string;
}

export default function ProgramCard({ sport, description, status, icon, accentColor = "hsl(var(--primary))", imageUrl }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="group relative flex-shrink-0 w-72 lg:w-80 cursor-pointer"
      data-testid={`card-program-${sport.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Outer Shell (Double-Bezel) */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] p-1.5 transition-colors duration-500 group-hover:bg-white/[0.05] group-hover:border-white/[0.12]" />

      {/* Inner Core */}
      <div className="relative h-full rounded-[calc(2.5rem-0.375rem)] bg-[hsl(var(--card))] border border-white/[0.05] overflow-hidden flex flex-col">
        {imageUrl && (
          <div className="relative h-44 overflow-hidden">
            <img
              src={imageUrl}
              alt={sport}
              className="w-full h-full object-cover transition-transform duration-1000 ease-vanguard group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-xl">
              {icon}
            </div>
            <span
              className={`absolute bottom-4 right-4 text-[10px] font-display tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                status === "active"
                  ? "border-[hsl(var(--primary))]/40 text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                  : "border-white/20 text-white/50 bg-white/5"
              } backdrop-blur-sm`}
            >
              {status === "active" ? "● ACTIVE" : "EXPANDING"}
            </span>
          </div>
        )}

        <div className="p-8 flex-1 flex flex-col">
          {!imageUrl && (
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20 flex items-center justify-center text-3xl">
                {icon}
              </div>
              <span
                className={`text-[10px] font-display tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                  status === "active"
                    ? "border-[hsl(var(--primary))]/40 text-[hsl(var(--primary))]"
                    : "border-white/20 text-white/50"
                }`}
              >
                {status === "active" ? "● ACTIVE" : "EXPANDING"}
              </span>
            </div>
          )}

          <h3 className="font-display text-2xl tracking-tight text-[hsl(var(--foreground))] mb-3 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
            {sport.toUpperCase()}
          </h3>
          <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mb-6 flex-1">
            {description}
          </p>

          <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between group-hover:border-white/[0.1] transition-colors duration-500">
            <span className="text-xs font-display tracking-widest text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors duration-300">
              LEARN MORE
            </span>
            {/* Button-in-Button Trailing Icon Architecture */}
            <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] group-hover:border-[hsl(var(--primary))] transition-all duration-500 transform group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
