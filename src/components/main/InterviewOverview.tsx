import Image from "next/image";
import { User } from "lucide-react";

interface OverviewCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  onClick: () => void;
  tags?: Array<{
    label: string;
    color?: string;
  }>;
}

export function OverviewCard({
  title,
  subtitle,
  description,
  image,
  onClick,
  tags,
}: OverviewCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700/80 transition-colors cursor-pointer"
    >
      <div className="flex gap-4">
        {image && (
          <div className="relative w-16 h-16 bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={title}
              width={64}
              height={64}
              className="object-cover w-full h-full"
              onError={() => {
                const fallback = (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={24} />
                  </div>
                );
                return fallback;
              }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-zinc-100 mb-1 truncate">
            {title}
          </h3>
          {subtitle && <p className="text-sm text-zinc-400 mb-2">{subtitle}</p>}
          <p className="text-sm text-zinc-300 line-clamp-2">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    tag.color || "bg-zinc-700 text-zinc-300"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
