import { PagingType } from '../../server/schema/types'

export interface List<TItem> {
  paging: PagingType
  items: TItem[]
}
