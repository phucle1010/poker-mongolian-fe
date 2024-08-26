'use client'

import { Room } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface ItemProps {
  room: Room
}

export const Item = ({ room }: ItemProps) => {
  return (
    <Link
      className="room no-underline"
      href={`/dashboard/table?roomId=${room.id}`}
    >
      <div className="icon icon-color-white">
        <Image
          src="/images/icon/icon_poker.png"
          alt="image alt"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <div className="room_name fz-10">
        Ширээ - <span className="fz-18 fw-600">{room.name}</span>
      </div>
      <div className="info fz-12 mt-8"></div>
    </Link>
  )
}
