import { MENU_ANIMATION_DURATION_MS } from "../pages/menu";
import "./header.css";

interface HeaderProps {
    toggleMenuVisible: () => void;
}

let ignoreButtonClick = false;

export const Header: React.FC<HeaderProps> = (props) => {

    const hamburgerContainerClicked = async (e: React.MouseEvent) => {
        if (ignoreButtonClick) {
            return;
        }

        props.toggleMenuVisible();
        e.currentTarget.classList.toggle("change");
        ignoreButtonClick = true;
        setTimeout(() => {
            ignoreButtonClick = false;
        }, MENU_ANIMATION_DURATION_MS)
    }

    return (
        <div id="header">
            <button id="hamburgerContainer" onClick={hamburgerContainerClicked}>
                <div className="hamburgerBar1"></div>
                <div className="hamburgerBar2"></div>
                <div className="hamburgerBar3"></div>
            </button>
            <a href="/" id="publicationTitle">
                PUBLICATION TITLE
            </a>
            <button id="subscribeButton">
                Subscribe
            </button>
        </div>
    )
}
