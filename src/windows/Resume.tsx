import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

const Resume = () => {
    const [error, setError] = useState<Error | null>(null);

    return (
        <>
            <div className="window-header">
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

            {error ? (
                <div className="p-8 text-center text-red-500">
                    Failed to load PDF: {error.message}
                </div>
            ) : (
                <Document 
                    file="/files/resume.pdf"
                    onLoadError={setError}
                >
                    <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
                </Document>
            )}
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
