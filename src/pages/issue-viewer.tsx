import { useParams } from "react-router";
import "./issue-viewer.css";
import { useState } from "react";

export const LATEST_ISSUE = "yyyy-mm-dd" as const;

export const IssueViewer = () => {
    const largeScreenMediaQuery = window.matchMedia("(min-width: 768px)");
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(largeScreenMediaQuery.matches)
    largeScreenMediaQuery.addEventListener("change", (e) => {
        if (e.matches !== isLargeScreen) {
            setIsLargeScreen(e.matches);
        }
    });

    return (
        <div id="issue-viewer-container">
            {isLargeScreen ?
                <TwoPageIssueViewer /> :
                <OnePageIssueViewer />}
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
        <div id="issue-viewer">
            {normalizedPageId === 0 ? null : <img id="left" src={`/src/assets/${issueId}/${normalizedPageId}.jpg`} />}
            <img id="right" src={`/src/assets/${issueId}/${normalizedPageId + 1}.jpg`} />
        </div>
    )
}

const OnePageIssueViewer = () => {
    const { issueId, pageId } = useParams();
    return (
        <div id="issue-viewer">
            <img id="center" src={`/src/assets/${issueId}/${pageId ?? 1}.jpg`} />
        </div>
    )
}