import { LATEST_ISSUE } from "./issue-viewer";
import "./landing.css";

export const Landing = () => {
    return (
        <div id="landing-container">
            <div id="latest-issue-container">
                Check out our latest issue!
                <a href={`issues/${LATEST_ISSUE}`}>
                    <img id="latest-issue-image" src={`src/assets/${LATEST_ISSUE}/cover.jpg`} alt="latest issue" />
                </a>
            </div>
            <div>Blah</div>
        </div>
    )
}
