import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Dock, Home, Navbar, Welcome, ThemeProvider } from "#components";
import {
    Contact,
    Finder,
    Gallery,
    Image,
    Resume,
    Safari,
    Terminal,
    Text,
} from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
            <main>
                <Navbar />
                <Welcome />
                <Dock />

                <Terminal />
                <Safari />
                <Resume />
                <Finder />
                <Text />
                <Image />
                <Contact />
                <Gallery />
                <Home />
            </main>
        </ThemeProvider>
    );
};

export default App;
