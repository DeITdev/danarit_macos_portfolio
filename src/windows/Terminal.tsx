import { WindowControls } from "#components";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag, ChevronLeft } from "lucide-react";
import useWindowStore from "#store/window";

const Terminal = () => {
    const { closeWindow } = useWindowStore();

    return (
        <>
            {/* Desktop Header */}
            <div className="window-header max-sm:hidden">
                <WindowControls target="terminal" />
                <h2>Tech Stack</h2>
            </div>

            {/* Mobile Header */}
            <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
                <button
                    onClick={(e) => { e.stopPropagation(); closeWindow("terminal"); }}
                    className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
                >
                    <ChevronLeft size={18} className="mr-1" /> Go Back
                </button>
                <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none">
                    Terminal
                </h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">@danar % </span>
                    show tech stack
                </p>
                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>
                <ul className="content max-sm:border-t-0 max-sm:border-b max-sm:border-dashed max-sm:my-0 max-sm:pb-5 max-sm:mb-5 max-sm:pt-2">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:mb-6">
                            {/* Desktop */}
                            <Check className="check max-sm:hidden" size={20} />
                            <h3 className="font-semibold text-[#00A154] w-32 ms-5 max-sm:hidden">{category}</h3>

                            {/* Mobile */}
                            <div className="sm:hidden flex items-center text-[#00A154] font-semibold text-[16px]">
                                <span className="mr-3 text-[18px]">&gt;</span> {category}
                            </div>

                            <ul className="flex items-center gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-1 max-sm:ml-6">
                                {items.map((item, i) => (
                                    <li key={i} className="text-black dark:text-[#d1d1d1] max-sm:text-[15px] flex items-center">
                                        <span className="sm:hidden mr-2.5 text-black/40 dark:text-[#d1d1d1] font-semibold">-</span>
                                        {item}<span className="max-sm:hidden">{i < items.length - 1 ? "," : ""}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote">
                    <p>
                        <Check size={20} /> {techStack.length} of {techStack.length} stacks loaded successfully (100%)
                    </p>
                    <p className="text-black dark:text-white">
                        <Flag size={15} fill="currentColor" />
                        Render time: 6ms
                    </p>
                </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
