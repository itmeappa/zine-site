import { useParams } from "react-router";
import "./issue-viewer.css";
import { useState } from "react";

export const LATEST_ISSUE = "yyyy-mm-dd" as const;

const OnePageIssueViewer = () => {
    const { issueId, pageId } = useParams();
    return (
        <div className="issue-viewer">
            <img className="center" src={`/src/assets/${issueId}/${pageId ?? 1}.jpg`} />
        </div>
    )
}

const TwoPageIssueViewer = () => {
    const { issueId, pageId: queriedPageId } = useParams();
    if (!queriedPageId) {
        window.history.pushState({}, "", `/issues/${issueId}/0`);
    }

    let normalizedPageId = Number(queriedPageId ?? 0);

    if (normalizedPageId % 2 === 1) {
        normalizedPageId--;
    }

    return (
        <div className="issue-viewer">
            {normalizedPageId === 0 ? null : <img className="left-page" src={`/src/assets/${issueId}/${normalizedPageId}.jpg`} />}
            <img className="right-page" src={`/src/assets/${issueId}/${normalizedPageId + 1}.jpg`} />
        </div>
    )
}

const RIGHT_ARROW_HTML_CHAR_CODE = String.fromCharCode(8594);
const LEFT_ARROW_HTML_CHAR_CODE = String.fromCharCode(8592);

export const IssueViewer = () => {
    const largeScreenMediaQuery = window.matchMedia("(min-width: 1024px)");
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(largeScreenMediaQuery.matches)
    largeScreenMediaQuery.addEventListener("change", (e) => {
        if (e.matches !== isLargeScreen) {
            setIsLargeScreen(e.matches);
        }
    });

    return (
        <div className="issue-viewer-container">
            <button className="">{LEFT_ARROW_HTML_CHAR_CODE}</button>
            {isLargeScreen ?
                <TwoPageIssueViewer /> :
                <OnePageIssueViewer />}
            <button>{RIGHT_ARROW_HTML_CHAR_CODE}</button>
        </div>
    )
}