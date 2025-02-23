export const ErrorPage = () => {
    return (
        <div>
            <div>Oops! We had some problem finding this page...</div>
            <div onClick={() => window.history.back()}>Want to go back to the last page?</div>
        </div>
    );
}