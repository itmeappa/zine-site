import "./issue-viewer.css";
import { useEffect, useState } from "react";

interface IssuePageViewerProps {
    pageIndex: number;
    setPageIndex: (val: number) => void;
    issueId: string;
    lastPage: number;
}

const OnePageIssueViewer = (props: IssuePageViewerProps) => {
    return (
        <div className="issue-viewer">
            <img className="center" src={`/src/assets/${props.issueId}/${props.pageIndex}.jpg`} />
        </div>
    )
}

/**
 * @description
 * This viewer uses the passed-in index as the right page. That means that if 
 * the index is 1, then the left page (0) would not be displayed. Then, the next
 * page would display [2, 3], [4, 5], ...
 * 
 * If the last page is odd, then this Just Works™, but if the last page is even,
 * then the previous page is odd, and we should have already seen it, so we also
 * hide the left page.
 */
const TwoPageIssueViewer = (props: IssuePageViewerProps) => {
    if (props.pageIndex % 2 === 0 && props.pageIndex !== props.lastPage) {
        props.setPageIndex(props.pageIndex + 1);
    }

    const hideLeftPage = props.pageIndex === 1 || props.pageIndex === props.lastPage;
    return (
        <div className="issue-viewer">
            {hideLeftPage ? null : <img className="left-page" src={`/src/assets/${props.issueId}/${props.pageIndex - 1}.jpg`} />}
            <img className="right-page" src={`/src/assets/${props.issueId}/${props.pageIndex}.jpg`} />
        </div>
    )
}

const RIGHT_ARROW_HTML_CHAR_CODE = String.fromCharCode(8594);
const LEFT_ARROW_HTML_CHAR_CODE = String.fromCharCode(8592);

export interface IssueViewerProps {
    initialPageIndex: number;
    isLargeScreen: boolean;
    issueId: string;
    lastPage: number;
}

export const IssueViewer = ({isLargeScreen, lastPage, initialPageIndex, issueId}: IssueViewerProps) => {
    const [pageIndex, setPageIndex] = useState<number>(initialPageIndex);
    const pageOffset = isLargeScreen ? 2 : 1;

    const leftButtonClicked = () => {
        const lastPageIsSingle = isLargeScreen && pageIndex === lastPage && lastPage % 2 === 0;
        let newPage = Math.max(1, pageIndex - pageOffset);
        if (lastPageIsSingle) {
            newPage = lastPage - 1;
        }
        setPageIndex(newPage);
    }

    const rightButtonClicked = () => {
        setPageIndex(Math.min(lastPage, pageIndex + pageOffset));
    }

    const [isLeftButtonDisabled, setLeftButtonDisabled] = useState<boolean>(false);
    const [isRightButtonDisabled, setRightButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        window.history.pushState({}, "", `/issues/${issueId}/${pageIndex}`);

        setLeftButtonDisabled(pageIndex === 1);
        let lastIndex = lastPage;
        if (isLargeScreen) {
            lastIndex = lastPage - (lastPage % 2);
        }
        setRightButtonDisabled(pageIndex >= lastIndex)
    }, [pageIndex]);
    
    const issuePageViewerProps: IssuePageViewerProps = {
        pageIndex,
        setPageIndex,
        issueId,
        lastPage,
    }

    return (
        <div className="issue-viewer-container">
            <button disabled={isLeftButtonDisabled} className="left-button" onClick={leftButtonClicked}>
                <div>{LEFT_ARROW_HTML_CHAR_CODE}</div>
            </button>

            {isLargeScreen ?
                <TwoPageIssueViewer {...issuePageViewerProps} /> :
                <OnePageIssueViewer {...issuePageViewerProps} />}

            <button disabled={isRightButtonDisabled} className="right-button" onClick={rightButtonClicked}>
                <div>{RIGHT_ARROW_HTML_CHAR_CODE}</div>
            </button>
        </div>
    )
}