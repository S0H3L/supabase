import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Toggle, Input, IconChevronLeft, IconSearch } from '@supabase/ui'

import { useStore } from 'hooks'
import PublicationsTableItem from './PublicationsTableItem'
import Table from 'components/to-be-cleaned/Table'

interface Props {
  selectedPublication: any
  onSelectBack: () => void
  onPublicationUpdated: (publication: any) => void
}

const PublicationsTables: FC<Props> = ({
  selectedPublication,
  onSelectBack,
}) => {
  const { meta } = useStore()
  const [filterString, setFilterString] = useState<string>('')

  const tables =
    filterString.length === 0
      ? meta.tables.list((table: any) => !meta.excludedSchemas.includes(table.schema))
      : meta.tables.list(
          (table: any) =>
            !meta.excludedSchemas.includes(table.schema) && table.name.includes(filterString)
        )

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button
              type="outline"
              onClick={() => onSelectBack()}
              icon={<IconChevronLeft />}
              style={{ padding: '5px' }}
            />
            <div>
              <Input
                size="small"
                placeholder={'Filter'}
                value={filterString}
                onChange={(e) => setFilterString(e.target.value)}
                icon={<IconSearch size="tiny" />}
              />
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
      <div>
        <Table
          head={[
            <Table.th key="header-name">Name</Table.th>,
            <Table.th key="header-schema">Schema</Table.th>,
            <Table.th key="header-desc" className="text-left hidden lg:table-cell">
              Description
            </Table.th>,
            <Table.th key="header-all"></Table.th>,
          ]}
          body={tables.map((table: any, i: number) => (
            <PublicationsTableItem
              key={table.id}
              table={table}
              selectedPublication={selectedPublication}
            />
          ))}
        />
      </div>
    </>
  )
}

export default observer(PublicationsTables)
