import { PagingType } from '../../server/schema/types'

export type List<TItem> = {
    paging: PagingType,
    items: TItem[]
}
