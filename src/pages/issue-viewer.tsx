import { useParams } from "react-router";
import "./issue-viewer.css";

export const IssueViewer = () => {
    const { issueId } = useParams();
    console.log(issueId);
    window.history.pushState({}, null, "/issues/latest2");
    return (
        <div id="issue-viewer-container">
            <iframe src="/src/assets/sample.pdf" type="application/pdf" height="100%" width="67%">
                <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
            </iframe>
        </div>
    )
}
