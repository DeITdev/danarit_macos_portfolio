import { WindowControls } from "#components";
import { photosLinks, gallery } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Mail, Search, ChevronLeft } from "lucide-react";
import useWindowStore from "#store/window";

const Gallery = () => {
  const { openWindow, closeWindow } = useWindowStore();

  return (
    <>
      <div className="window-header max-sm:hidden">
        <WindowControls target="photos" />
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
        <button
          onClick={(e) => { e.stopPropagation(); closeWindow("photos"); }}
          className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
        >
          <ChevronLeft size={18} className="mr-1" /> Go Back
        </button>
        <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none truncate max-w-[200px]">
          All Photos
        </h2>
      </div>

      <div className="flex max-sm:flex-col bg-transparent">
        <div className="sidebar max-sm:hidden">
          <h2>Photos</h2>
          <ul className="flex flex-col gap-1">
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery w-full">
          <ul className="max-sm:grid max-sm:grid-cols-2 max-sm:gap-3 max-sm:p-4">
            {gallery.map(({ id, img, alt }) => (
              <li 
                key={id} 
                className="cursor-pointer max-sm:aspect-square overflow-hidden rounded-lg group max-sm:!col-auto max-sm:!row-auto max-sm:!col-span-1 max-sm:!row-span-1"
                onClick={() => openWindow("imgfile", { 
                  id, 
                  name: alt || `gallery-${id}`, 
                  icon: img, 
                  imageUrl: img, 
                  kind: "file" 
                } as any)}
              >
                <img src={img} alt={alt || `gallery-${id}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 max-sm:!rounded-lg" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");

export default GalleryWindow;
