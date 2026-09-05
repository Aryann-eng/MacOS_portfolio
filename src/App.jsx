import { Navbar, Welcome, Dock } from "#components";

import Terminal from "../windows/Terminal";
import Safari from "../windows/Safari";
import Resume from "../windows/Resume";
import Finder from "../windows/Finder";
import Text from "../windows/Text";
import Image from "../windows/Image";
import Contact from "../windows/Contact" 
import Home from "../windows/Home"
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";


gsap.registerPlugin(Draggable);

const App = () => {
    return (
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
            <Contact/>
            <Home/>
        </main>
    );
};

export default App;