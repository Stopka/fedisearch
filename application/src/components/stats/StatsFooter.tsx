import {ReactElement} from "react";
import {StatsAggregationFragment} from "../../graphql/generated/types";

export default function StatsFooter({sumAggregation}: { sumAggregation: StatsAggregationFragment | undefined }): ReactElement {
    return (
        <tfoot>
        <tr>
            <th>Summary</th>
            <th className={'text-end'}>{sumAggregation?.nodeCount??0}</th>
            <th className={'text-end'}>{sumAggregation?.accountFeedCount??0}</th>
            <th className={'text-end'}>{sumAggregation?.channelFeedCount??0}</th>
        </tr>
        </tfoot>
    )
}
