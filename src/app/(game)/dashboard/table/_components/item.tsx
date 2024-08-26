'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'
import { formatChipsAmount } from '@/utils/formatting'
import { useRouter } from 'next/navigation'
import { PlayersInRoom } from './table-type'

interface ItemProps {
  table: Table
  roomId: string
}

export const Item = ({ table, roomId }: ItemProps) => {
  const router = useRouter()
  const user = useCurrentUser()
  const { onOpen } = useModal()

  const onClick = () => {
    if (!user) {
      return router.push('/auth/login')
    }

    const isNotEnoughChips = user.chipsAmount < table.minBuyIn

    if (isNotEnoughChips) {
      return onOpen('buyChips', { table })
    }

    onOpen('buyIn', { table, roomId })
  }

  return (
    <div
      className="room new-version !h-72 relative cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20">
        <div className="text-globalYellow font-bold text-2xl text-center !line-clamp-2 ">
          {table.name}
        </div>
      </div>
      <div className="relative z-10">
        <img src="/images/table_v2.png" alt="table-image" />
        {table?.players?.length > 0 && (
          <PlayersInRoom players={table.players} />
        )}
      </div>
      <img
        src="/images/card_range.svg"
        alt="cards-range"
        className="absolute top-1/2 -translate-y-1/2 w-2/5 z-20"
      />
    </div>
  )
}
