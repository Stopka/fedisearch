import React, {ReactElement} from "react";
import {ListNodesItemFragment} from "../../graphql/generated/types";
import NodeResult from "./NodeResult";

export default function NodeResults({nodes}:{
    nodes:ListNodesItemFragment[]|undefined,
}):ReactElement{
    if(nodes === undefined){
        return <></>
    }

    return (
        <tbody>
        {(nodes.length > 0)
            ? nodes.map((node, index) => {
                return (
                    <NodeResult node={node} key={index}/>
                )
            })
            : (
                <tr>
                    <td colSpan={9}>No servers found</td>
                </tr>
            )}
        </tbody>
    )
}
