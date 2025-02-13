
const DotLoader = ({
    bgColor = "bg-gray-500",
    dotWidth = "w-2",
    dotHeight = "h-2",
    containerHeight = "h-5",
    dataTestID = "dot-loader",
}: {
    bgColor?: string;
    dotWidth?: string;
    dotHeight?: string;
    containerHeight?: string;
    dataTestID?: string;
}) => {
    return (
        <div data-testid={dataTestID} className={`loading-dots ${containerHeight}`}>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
        </div>
    );
};

export default DotLoader;
