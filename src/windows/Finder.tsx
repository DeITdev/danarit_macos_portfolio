import { WindowControls } from "#components";
import { Search, ChevronLeft } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations } from "#constants";
import useLocationStore from "#store/location";
import clsx from "clsx";
import useWindowStore from "#store/window";
import type { LocationItem, LocationFolder } from "#types";
import { useState, useEffect } from "react";

const Finder = () => {
  const { openWindow, closeWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  // Mobile specific states
  const [isMobileRoot, setIsMobileRoot] = useState(true);
  // Track navigation history for mobile back button
  const [mobileNavStack, setMobileNavStack] = useState<(LocationFolder | LocationItem | null)[]>([]);

  // Set default to root on mobile when opened, optionally we can use a window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640 && !isMobileRoot && activeLocation?.id === locations.work.id) {
        // If we want to force root, we could, but it's okay to just leave the current state
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileRoot, activeLocation]);

  const openItem = (item: LocationItem) => {
    if (item.kind === "folder") {
      // Push current location to nav stack before navigating
      if (window.innerWidth <= 640) {
        if (isMobileRoot) {
          // From root, push null so breadcrumbs start clean
          setMobileNavStack([null]);
        } else {
          setMobileNavStack((prev) => [...prev, activeLocation]);
        }
      }
      setActiveLocation(item);
      setIsMobileRoot(false);
      return;
    }

    // It's a file
    if ("fileType" in item) {
      if (item.fileType === "pdf") return openWindow("resume");
      if (["fig", "url"].includes(item.fileType ?? "") && "href" in item && item.href) {
        return window.open(item.href, "_blank");
      }
      openWindow(`${item.fileType}${item.kind}` as import("#types").WindowKey, item);
    }
  };

  const handleMobileBack = () => {
    if (!isMobileRoot) {
      // Pop the last location from nav stack
      const newStack = [...mobileNavStack];
      const prevLocation = newStack.pop();
      setMobileNavStack(newStack);

      if (prevLocation === null || prevLocation === undefined) {
        // We're going back to the root
        setIsMobileRoot(true);
        setActiveLocation(null);
      } else {
        // We're going back to a parent folder
        setActiveLocation(prevLocation);
      }
    } else {
      closeWindow("finder");
    }
  };

  // Build breadcrumb path for mobile
  const getBreadcrumbs = (): { label: string; location: LocationFolder | LocationItem | null; isRoot: boolean }[] => {
    const crumbs: { label: string; location: LocationFolder | LocationItem | null; isRoot: boolean }[] = [];
    crumbs.push({ label: "Portfolio", location: null, isRoot: true });

    for (const loc of mobileNavStack) {
      if (loc && "name" in loc) {
        crumbs.push({ label: loc.name, location: loc, isRoot: false });
      }
    }

    if (activeLocation && "name" in activeLocation) {
      crumbs.push({ label: activeLocation.name, location: activeLocation, isRoot: false });
    }

    return crumbs;
  };

  const handleBreadcrumbClick = (crumb: { label: string; location: LocationFolder | LocationItem | null; isRoot: boolean }, index: number) => {
    if (crumb.isRoot) {
      // Go back to root
      setIsMobileRoot(true);
      setActiveLocation(null);
      setMobileNavStack([]);
    } else if (crumb.location) {
      // Navigate to this breadcrumb's location
      // Trim the nav stack to everything before this crumb (index 0 is Portfolio, so stack items start at index 1)
      const newStack = mobileNavStack.slice(0, index - 1);
      setMobileNavStack(newStack);
      setActiveLocation(crumb.location);
      setIsMobileRoot(false);
    }
  };

  const renderList = (
    name: string,
    items: (LocationFolder | LocationItem)[],
  ) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item: LocationFolder | LocationItem) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              activeLocation && item.id === activeLocation.id
                ? "active"
                : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      {/* Desktop Header */}
      <div className="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      {/* Mobile Header */}
      <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-0 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-transparent z-50 flex flex-col">
        <div className="flex items-center justify-between px-5 mb-1 relative">
          <button
            onClick={handleMobileBack}
            className="text-[#0a84ff] flex items-center gap-1 text-[15px] cursor-pointer bg-transparent border-none outline-none z-20 relative touch-manipulation p-3 -ml-3"
          >
            <ChevronLeft size={18} className="mr-[-2px]" /> Go Back
          </button>
          <span className="text-black dark:text-white font-semibold text-[17px] truncate max-w-[200px]">
            {!isMobileRoot && activeLocation ? activeLocation.name : "Portfolio"}
          </span>
        </div>

        {/* Breadcrumbs Row */}
        {!isMobileRoot && activeLocation && (
          <div className="px-5 py-4 flex items-center text-[#0a84ff] text-[14px] font-medium whitespace-nowrap overflow-x-auto no-scrollbar bg-[#F9FAFB] dark:bg-[#323232]">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="text-[#888] mx-2 font-normal">&gt;</span>}
                {i < breadcrumbs.length - 1 ? (
                  <span
                    onClick={() => handleBreadcrumbClick(crumb, i)}
                    className="cursor-pointer touch-manipulation text-[#0a84ff]"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <span className="text-[#0a84ff]">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] flex h-full max-sm:bg-white dark:max-sm:bg-[#1e1e1e]">
        {/* Desktop Sidebar */}
        <div className="sidebar">
          {renderList(
            "Favourites",
            Object.values(locations) as LocationFolder[],
          )}
          {renderList("Work", locations.work.children as LocationItem[])}
        </div>

        {/* Desktop & Mobile Folder Content */}
        <ul className={clsx("content", isMobileRoot ? "max-sm:hidden" : "max-sm:grid max-sm:grid-cols-3 max-sm:gap-4 max-sm:p-6 max-sm:place-items-center", "sm:block")}>
          {activeLocation &&
            "children" in activeLocation &&
            activeLocation.children?.map((item: LocationItem) => (
              <li
                key={item.id}
                className={clsx(item.position, "max-sm:!relative max-sm:!top-auto max-sm:!left-auto max-sm:!right-auto max-sm:!bottom-auto max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-2")}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} className="max-sm:w-[80px] max-sm:h-[80px] max-sm:object-contain" />
                <p className="max-sm:text-[12px] max-sm:text-center text-black dark:text-white max-sm:leading-tight">{item.name}</p>
              </li>
            ))}
        </ul>

        {/* Mobile Root Folders */}
        <ul className={clsx("content", isMobileRoot ? "max-sm:grid max-sm:grid-cols-3 max-sm:gap-4 max-sm:p-6 max-sm:place-items-center" : "max-sm:hidden", "sm:hidden")}>
          {Object.values(locations).map((loc) => (
            <li
              key={loc.id}
              className="max-sm:!relative max-sm:!top-auto max-sm:!left-auto max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-2"
              onClick={() => openItem(loc)}
            >
              {/* Use the standard folder icon for mobile root layout to match image */}
              <img src="/images/folder.png" alt={loc.name} className="max-sm:w-[80px] max-sm:h-[80px] max-sm:object-contain" />
              <p className="max-sm:text-[12px] max-sm:text-center text-black dark:text-white max-sm:leading-tight">{loc.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
