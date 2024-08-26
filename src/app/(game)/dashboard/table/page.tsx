'use client'

import { useModal } from '@/store/use-modal-store'
import { TableContent } from './_components/table-content'
import { UserBoard } from '@/components/user-board'
import tableApi from '@/services/api/modules/table-api'
import { useCurrentUser } from '@/hooks/use-current-user'
import playerApi from '@/services/api/modules/player-api'
import { useSocket } from '@/providers/socket-provider'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const TablePage = () => {
  const { onOpen } = useModal()
  const currentUser = useCurrentUser()
  const { socket } = useSocket()
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId')
  const [joining, setJoining] = useState<boolean>(false)

  const joinTable = async () => {
    try {
      if (!currentUser) return
      setJoining(true)

      const { response: table, error: getRandomTableError } =
        await tableApi.joinRandomTable({
          currentChipsOfUser: currentUser.chipsAmount,
        })

      if (getRandomTableError) {
        toast.error('Санамсаргүй хүснэгтийг авахад алдаа гардаг')
        setJoining(false)
        return
      }

      const { error: createPlayerError } = await playerApi.createPlayer({
        tableId: table.id,
        userId: currentUser.id,
        socketId: socket.id,
        buyIn: table.minBuyIn,
      })

      if (createPlayerError) {
        toast.error('Тоглогч үүсгэх үед алдаа гарлаа')
        setJoining(false)
        return
      }
      router.push(`/dashboard/table/${table.id}?roomId=${table.roomId}`)
      setJoining(false)
    } catch (error) {
      console.error(error)
      setJoining(false)
    }
  }

  return (
    <div className="boding_main">
      <div className="sidebar_left hidden md:!block ">
        <UserBoard />

        {/* Enter random room */}
        <div className="page-sub">
          <button
            className="room w-full mt-3 w-full px-4 !py-3 !flex !flex-row items-center gap-2"
            onClick={() => joinTable()}
          >
            <span>Санамсаргүй өрөөнд орно</span>
            {joining && <span>...</span>}
          </button>
        </div>

        {/* Enter specific room with ID and Pass */}
        <div className="page-sub">
          <button
            className="room w-full mt-3 w-full px-4 !py-3"
            onClick={() =>
              onOpen('enterSpecificTable', { roomId: roomId ?? '' })
            }
          >
            <span>Кодын дагуу өрөөнд орно</span>
          </button>
        </div>
      </div>
      <TableContent />
    </div>
  )
}

export default TablePage
