import { useParams } from "react-router";
import { IssueViewer, IssueViewerProps } from "./issue-viewer"
import { useState } from "react";
import Issues from "../assets/issues.json";
import { ErrorPage } from "./error";

export const LATEST_ISSUE = Issues.latestIssue;

function issueExists(issueId: string | undefined): issueId is keyof typeof Issues["issues"] {
    if (!issueId) {
        return false;
    }

    if (!(issueId in Issues.issues)) {
        return false;
    }

    return true;
}

function issueAndPageExists(issueId: string | undefined, pageIndex: number): issueId is keyof typeof Issues["issues"] {
    if (!issueExists(issueId)) {
        return false;
    }
    const lastPageOfIssue = Issues.issues[issueId].pages;
    if (pageIndex < 1 || pageIndex > lastPageOfIssue) {
        return false;
    }

    return true;
}

export const IssueManager = () => {
    const largeScreenMediaQuery = window.matchMedia("(min-width: 1024px)");
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(largeScreenMediaQuery.matches)
    largeScreenMediaQuery.addEventListener("change", (e) => {
        if (e.matches !== isLargeScreen) {
            setIsLargeScreen(e.matches);
        }
    });

    const { issueId, pageId: queriedPageId } = useParams();
    const initialPageIndex = Number(queriedPageId ?? 1);

    if (!issueAndPageExists(issueId, initialPageIndex)) {
        return (
            <ErrorPage />
        );
    }

    if (!queriedPageId) {
        window.history.pushState({}, "", `/issues/${issueId}/${initialPageIndex}`);
    }

    const issueViewerProps: IssueViewerProps = {
        initialPageIndex,
        isLargeScreen,
        issueId,
        lastPage: Issues.issues[issueId].pages,
    }

    return (
        <IssueViewer {...issueViewerProps} />
    )
}