'use client'

import { Room } from '@/types'
import { Item } from './item'
import { Loader } from 'lucide-react'

interface RoomListProps {
  rooms: Room[]
}

export const RoomList = ({ rooms }: RoomListProps) => {
  if (!Array.isArray(rooms) || !rooms.length) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {rooms.map(room => (
        <div key={room.id}>
          <Item room={room} />
        </div>
      ))}
    </div>
  )
}
