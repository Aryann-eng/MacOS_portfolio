import WindowControlls from "#components/WindowConrolls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Search } from "lucide-react";
import { locations } from "#constants/index";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";
import clsx from "clsx";

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const openItem = (item) => {
        if (item.kind === "folder") {
            setActiveLocation(item);
            return;
        }

        if (item.fileType === "txt") {
            openWindow("txtfile", item);
            return;
        }

        if (item.fileType === "img") {
            openWindow("imgfile", item);
            return;
        }

        if (item.fileType === "url") {
            window.open(item.href, "_blank");
            return;
        }

        if (item.fileType === "pdf") {
            openWindow("resume", item);
            return;
        }
    };

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>

            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActiveLocation(item)}
                        className={clsx(
                            item.id === activeLocation.id
                                ? "active"
                                : "not-active"
                        )}
                    >
                        <img
                            src={item.icon}
                            className="w-4"
                            alt={item.name}
                        />

                        <p className="text-sm font-medium truncate">
                            {item.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <div id="window-header">
                <WindowControlls target="finder" />

                <h2 className="font-bold text-sm">
                    {activeLocation.name}
                </h2>

                <Search className="icon" />
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList(
                        "Favorites",
                        Object.values(locations)
                    )}

                    {renderList(
                        "My Projects",
                        locations.work.children
                    )}
                </div>

                <ul className="content">
                    {activeLocation?.children?.map((item) => (
                        <li
                            key={item.id}
                            className={item.position}
                            onClick={() => openItem(item)}
                        >
                            <img
                                src={item.icon}
                                alt={item.name}
                            />

                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;