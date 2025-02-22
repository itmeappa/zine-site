import { useEffect, useState } from "react";
import "./menu.css";

const OPEN_CLASS = "open" as const;
const CLOSE_CLASS = "close" as const;

export const MENU_ANIMATION_DURATION_MS = 500 as const;

interface MenuProps {
    menuVisible: boolean;
    toggleMenuVisible: () => void;
}

export const Menu = (props: MenuProps)  => {
    const [displayState, setDisplay] = useState<"block" | "none">("none");
    useEffect(() => {
        if (props.menuVisible) {
            setDisplay("block")
        } else {
            setTimeout(() => {
                setDisplay("none")
            }, MENU_ANIMATION_DURATION_MS)
        }
    }, [props.menuVisible]);

    return (
        <div className="nav-container" style={{display: displayState}}>
            <div className={`overlay ${props.menuVisible ? OPEN_CLASS : CLOSE_CLASS}`} onClick={props.toggleMenuVisible}></div>
            <nav className={props.menuVisible ? OPEN_CLASS : CLOSE_CLASS}>
                <a href="about">About</a>
                <a href="#">Issues</a>
                <a href="#">Donate</a>
                <a href="#">Contact</a>
            </nav>

        </div>
    )
}
