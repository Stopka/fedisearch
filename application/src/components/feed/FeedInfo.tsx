import {ReactElement, ReactNode} from "react";

export default function FeedInfo({children, show}: { children?: ReactNode, show?: boolean }): ReactElement {
    if (show === false) {
        return <>{children}</>
    }
    return <></>
}
