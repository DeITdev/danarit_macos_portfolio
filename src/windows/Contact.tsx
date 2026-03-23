import WindowWrapper from "#hoc/WindowWrapper";
import { socials } from "#constants";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";
import { ChevronLeft } from "lucide-react";

const Contact = () => {
    const { closeWindow } = useWindowStore();

    return (
        <>
            <div className="window-header max-sm:hidden">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>

            {/* Mobile Header */}
            <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
                <button
                    onClick={(e) => { e.stopPropagation(); closeWindow("contact"); }}
                    className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
                >
                    <ChevronLeft size={18} className="mr-1" /> Go Back
                </button>
                <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none truncate max-w-[200px]">
                    Contact
                </h2>
            </div>

            <div className="p-5 space-y-5 max-sm:p-8 max-sm:space-y-0 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-6 max-sm:pb-12 max-sm:pt-10">
                <div className="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-4 max-sm:text-center">
                    <img
                        src="/images/adrian.jpg"
                        alt="Adrian"
                        className="w-20 rounded-full max-sm:w-[120px] max-sm:h-[120px] max-sm:object-cover max-sm:shadow-lg max-sm:border-2 max-sm:border-white/10"
                    />
                    <div className="max-sm:space-y-4 max-sm:px-2">
                        <h3 className="my-6 text-xl font-semibold text-black dark:text-white max-sm:text-[28px] max-sm:font-bold max-sm:leading-tight">
                            Let's Connect
                        </h3>
                        <p className="text-black dark:text-white max-sm:text-[17px] dark:max-sm:text-white/90 max-sm:leading-snug">
                            Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
                        </p>
                    </div>
                </div>

                <ul className="flex items-center gap-3 max-sm:w-full max-sm:flex-col max-sm:gap-4 max-sm:px-0">
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{ backgroundColor: bg }} className="rounded-lg p-3 w-60 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300 max-sm:w-full max-sm:rounded-[15px] max-sm:hover:scale-[1.02] max-sm:hover:translate-y-0">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="space-y-5 max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:p-5 max-sm:h-[110px] max-sm:space-y-0">
                                <img src={icon} alt={text} className="size-5 max-sm:size-8 brightness-0 !invert" />
                                <p className="font-semibold text-sm !text-white max-sm:text-[19px]">{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
