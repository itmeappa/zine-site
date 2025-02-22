import { useParams } from "react-router";
import { IssueViewer, IssueViewerProps } from "./issue-viewer"
import { useState } from "react";

export const IssueManager = () => {
    const largeScreenMediaQuery = window.matchMedia("(min-width: 1024px)");
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(largeScreenMediaQuery.matches)
    largeScreenMediaQuery.addEventListener("change", (e) => {
        if (e.matches !== isLargeScreen) {
            setIsLargeScreen(e.matches);
        }
    });

    const { issueId, pageId: queriedPageId } = useParams();

    // TODO: check issue existence
    if (!issueId) {
        return (
            <div>Oops we couldn't find that issue...</div>
        );
    }

    // TODO: fetch last page
    const lastPage = 12;
    const initialPageIndex = Number(queriedPageId ?? 1);
    if (initialPageIndex < 1 || initialPageIndex > lastPage) {
        return (
            <div>Oops we couldn't find that page...</div>
        );
    }

    if (!queriedPageId) {
        window.history.pushState({}, "", `/issues/${issueId}/${initialPageIndex}`);
    }

    const issueViewerProps: IssueViewerProps = {
        initialPageIndex,
        isLargeScreen,
        issueId,
        lastPage,
    }

    return (
        <IssueViewer {...issueViewerProps} />
    )
}