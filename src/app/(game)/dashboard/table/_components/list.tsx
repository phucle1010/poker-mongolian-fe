import { TableWithPlayers } from '@/types'
import { Item } from './item'
import { Loader } from 'lucide-react'

interface TableListProps {
  tables: TableWithPlayers[]
  loading: boolean
  roomId: string
}

export const TableList = ({ tables, loading, roomId }: TableListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!Array.isArray(tables) || !tables.length) {
    return <div>Энэ өрөөнд тохирох ширээ байхгүй байна</div>
  }

  // const totalPlayersByMinBuyIn = tables.reduce<{ [key: number]: number }>(
  //   (acc, table) => {
  //     const { minBuyIn, players } = table
  //     acc[minBuyIn] = (acc[minBuyIn] || 0) + players.length
  //     return acc
  //   },
  //   {}
  // )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tables.map(table => (
        <Item
          key={table.id}
          table={table}
          roomId={roomId}
          // totalPlayersByMinBuyIn={totalPlayersByMinBuyIn[table.minBuyIn]}
        />
      ))}
    </div>
  )
}
