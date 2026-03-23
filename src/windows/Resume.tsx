import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download, ChevronLeft } from "lucide-react";
import useWindowStore from "#store/window";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useState, useRef, useEffect } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

const Resume = () => {
    const { closeWindow } = useWindowStore();
    const [error, setError] = useState<Error | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (window.innerWidth <= 640) {
                    // Use clientWidth (excludes scrollbars) to ensure it fits perfectly inside the available space
                    setPageWidth(entry.target.clientWidth);
                } else {
                    setPageWidth(undefined);
                }
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="window-header max-sm:hidden">
                <WindowControls target="resume" />
                <h2>Resume.pdf</h2>

                <a
                    href="/files/resume.pdf"
                    download
                    className="cursor-pointer"
                    title="Download Resume"
                >
                    <Download className="icon" />
                </a>
            </div>

            {/* Mobile Header */}
            <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
                <button 
                    onClick={(e) => { e.stopPropagation(); closeWindow("resume"); }} 
                    className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
                >
                    <ChevronLeft size={18} className="mr-1" /> Go Back
                </button>
                <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none">
                    Resume
                </h2>
            </div>

            <div ref={containerRef} className="flex flex-col items-center">
                {error ? (
                    <div className="p-8 text-center text-red-500">
                        Failed to load PDF: {error.message}
                    </div>
                ) : (
                    <Document 
                        file="/files/resume.pdf"
                        onLoadError={setError}
                        className="max-sm:w-full flex justify-center"
                    >
                        <Page pageNumber={1} renderTextLayer renderAnnotationLayer width={pageWidth} />
                    </Document>
                )}
            </div>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
