import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  /** YouTube or iframe embed URL for video type */
  embedUrl?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  columns?: 2 | 3 | 4;
}

const gridCols = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

const MediaGallery = ({ items, columns = 3 }: MediaGalleryProps) => {
  const [selected, setSelected] = useState<MediaItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
        <p className="text-muted-foreground">Adicione suas fotos e vídeos aqui</p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(item)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden group brand-card bg-secondary"
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt || ""}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-5xl p-0 bg-background/95 backdrop-blur-xl border-border overflow-hidden">
          <DialogTitle className="sr-only">
            {selected?.alt || "Mídia"}
          </DialogTitle>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          {selected?.type === "image" ? (
            <img
              src={selected.src}
              alt={selected.alt || ""}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          ) : selected?.embedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={selected.embedUrl}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaGallery;
