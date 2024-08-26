'use client'

import { useModal } from '@/store/use-modal-store'
import { RoomContent } from './_components/room-content'
import { UserBoard } from '@/components/user-board'
import { useEffect, useState } from 'react'
import roomApi from '@/services/api/modules/room-api'
import { Room } from '@/types'

const TablePage = () => {
  const { onOpen } = useModal()
  const [roomList, setRoomList] = useState<Room[]>([])

  useEffect(() => {
    const fetchRooms = async () => {
      const { response } = await roomApi.getRoomsWithoutCondition()

      if (response) {
        setRoomList(response?.content as Room[])
      }
    }
    fetchRooms()
  }, [])

  return (
    <div className="boding_main">
      <div className="sidebar_left !hidden md:!block ">
        <UserBoard />
        <div className="page-sub">
          <button
            className="room mt-3 w-full px-4 !py-3"
            onClick={() => onOpen('tableCreator', { rooms: roomList })}
          >
            <span>өрөө бий болгох</span>
          </button>
        </div>
      </div>
      <RoomContent />
    </div>
  )
}

export default TablePage
