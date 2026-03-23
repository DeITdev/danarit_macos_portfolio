import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Copy,
    Mic,
    MoveRight,
    PanelLeft,
    Plus,
    Search,
    Share,
    ShieldHalf,
    Upload,
} from "lucide-react";

const Safari = () => {
    const { closeWindow } = useWindowStore();

    return (
        <>
            {/* Desktop Header */}
            <div className="window-header max-sm:hidden">
                <WindowControls target="safari" />

                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon" />
                    <ChevronRight className="icon" />
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon" />

                    <div className="search">
                        <Search className="icon" />

                        <input
                            type="text"
                            placeholder="Search or enter website name"
                            aria-label="Search or enter website name"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon" />
                    <Plus className="icon" />
                    <Copy className="icon" />
                </div>
            </div>

            {/* Mobile Header */}
            <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
                <button
                    onClick={(e) => { e.stopPropagation(); closeWindow("safari"); }}
                    className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
                >
                    <ChevronLeft size={18} className="mr-1" /> Go Back
                </button>
                <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none truncate max-w-[200px]">
                    Safari
                </h2>
            </div>

            {/* Content + Bottom Bar wrapper - fills remaining height */}
            <div className="sm:contents max-sm:flex max-sm:flex-col max-sm:min-h-[calc(100dvh-95px)]">
                {/* Blog Content */}
                <div className="blog max-sm:px-5 max-sm:py-6 max-sm:flex-1">
                    <h2>My Developer Blog</h2>

                    <div className="space-y-8">
                        {blogPosts.map(({ id, image, title, date, link }) => (
                            <div key={id} className="blog-post max-sm:flex max-sm:items-start max-sm:gap-4 max-sm:space-x-0">
                                <div className="col-span-2 max-sm:w-16 max-sm:h-16 max-sm:flex-shrink-0 max-sm:rounded-lg max-sm:overflow-hidden">
                                    <img src={image} alt={title} className="max-sm:w-full max-sm:h-full max-sm:object-cover" />
                                </div>

                                <div className="content max-sm:flex-1 max-sm:min-w-0">
                                    <p>{date}</p>
                                    <h3>{title}</h3>
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        Check out the full post <MoveRight className="icon-hover" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Bottom Bar - sticky at bottom */}
                <div className="sm:hidden sticky bottom-0 left-0 w-full bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-t border-gray-200 dark:border-[#3d3d3f] px-4 pt-3 pb-2 z-[70] flex-shrink-0">
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl px-4 py-2.5 mb-3">
                        <Search size={16} className="text-gray-400 dark:text-[#8e8e93] flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search or enter website name"
                            aria-label="Search or enter website name"
                            className="flex-1 bg-transparent outline-none text-[16px] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8e8e93] pointer-events-auto"
                        />
                        <Mic size={16} className="text-gray-400 dark:text-[#8e8e93] flex-shrink-0" />
                    </div>

                    <div className="flex items-center justify-between px-4 py-1 text-gray-400 dark:text-[#8e8e93]">
                        <ChevronLeft size={22} />
                        <ChevronRight size={22} />
                        <Upload size={20} />
                        <BookOpen size={20} />
                        <Copy size={20} />
                    </div>
                </div>
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
