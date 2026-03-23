import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { ChevronLeft } from "lucide-react";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <>
            <div className="window-header max-sm:hidden">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
            </div>

            {/* Mobile Header */}
            <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
                <button 
                    onClick={(e) => { e.stopPropagation(); useWindowStore.getState().closeWindow("txtfile"); }} 
                    className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
                >
                    <ChevronLeft size={18} className="mr-1" /> Go Back
                </button>
                <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none">
                    Preview
                </h2>
            </div>

            <div className="p-5 space-y-6 bg-transparent">
                {image ? (
                    <img src={image} alt={name} className="w-full h-auto rounded" />
                ) : null}

                {subtitle ? (
                    <h3 className="text-lg font-semibold text-black dark:text-[#f0f0f0]">{subtitle}</h3>
                ) : null}

                {Array.isArray(description) && description.length > 0 ? (
                    <div className="space-y-3 leading-relaxed text-base text-black dark:text-[#e5e5e5]">
                        {description.map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                ) : null}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
