import React, {ReactElement, ReactNode} from "react";

export default function ResponsiveTable({children, className}: {
    children: ReactNode,
    className?: string
}): ReactElement {
    return (
        <div className={'table-responsive'}>
            <table className={`table table-dark table-striped table-bordered nodes ${className??''}`}>
                {children}
            </table>
        </div>
    )
}
