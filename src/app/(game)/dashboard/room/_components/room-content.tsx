'use client'

import { Room } from '@/types'
import { RoomList } from './list'
import { useSocket } from '@/providers/socket-provider'
import { useEffect, useState } from 'react'
import { LuRefreshCw } from 'react-icons/lu'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useMountedState } from 'react-use'
import { Loader } from 'lucide-react'
import roomApi from '@/services/api/modules/room-api'
import Pagination from './pagination'

interface RoomContentProps {}

export const RoomContent = ({}: RoomContentProps) => {
  const isMounted = useMountedState()
  const [roomList, setRoomList] = useState<Room[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    fetchRooms()
  }, [searchParams])

  const fetchRooms = async () => {
    const { response, error } = await roomApi.getRooms({
      page: searchParams?.get('page') || '1',
    })

    if (error) {
      return toast.error('Өрөө авч чадсангүй')
    }

    if (response) {
      setRoomList(response?.rooms as Room[])
      setPageCount(response?.pageCount as number)
    }
  }

  if (!isMounted) return <RoomContentLoading />

  return (
    <div className="content_main">
      <div className="inner">
        <div className="form_custom form_room w-full ">
          <h2 className="ttl_main fz-18">
            <span>
              <strong className="icon sz-24 icon-color-white flex-shrink">
                <i className="icon-room"></i>
              </strong>
              Ширээ
              <LuRefreshCw
                className="size-4 text-white !block hover:scale-110 transition cursor-pointer"
                onClick={() => router.refresh()}
              />
            </span>
          </h2>
          <div className="row flex flex-center gapy-40">
            <svg>
              <filter id="noiseFilter2">
                <feturbulence
                  type="fractalNoise"
                  baseFrequency="0.6"
                  stitchTiles="stitch"
                ></feturbulence>
              </filter>
              <clipPath id="rounded-clip">
                <rect
                  x="0"
                  y="0"
                  width="300"
                  height="300"
                  rx="20"
                  ry="20"
                ></rect>
              </clipPath>
            </svg>
            <div className="col-12 col-md-8">
              <RoomList rooms={roomList} />

              {pageCount > 0 && <Pagination pageCount={pageCount} />}
            </div>
            <div className="col-12 col-md-4 py-8">
              <div className="room room_event">
                <p className="text-center">Илрэхэд бэлэн</p>
                <br />
                <span className="fz-14">Наадам өрөө</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RoomContentLoading = () => {
  return (
    <div className="content_main">
      <div className="inner">
        <div className="form_custom form_room w-full ">
          <h2 className="ttl_main fz-18">
            <span>
              <strong className="icon sz-24 icon-color-white flex-shrink">
                <i className="icon-room"></i>
              </strong>
              Ширээ
            </span>
          </h2>
          <div className="row flex flex-center gapy-40">
            <svg>
              <filter id="noiseFilter2">
                <feturbulence
                  type="fractalNoise"
                  baseFrequency="0.6"
                  stitchTiles="stitch"
                ></feturbulence>
              </filter>
              <clipPath id="rounded-clip">
                <rect
                  x="0"
                  y="0"
                  width="300"
                  height="300"
                  rx="20"
                  ry="20"
                ></rect>
              </clipPath>
            </svg>
            <div className="col-12 col-md-8">
              <div className="flex items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
              </div>
            </div>
            <div className="col-12 col-md-4 py-8">
              <div className="room room_event">
                <p className="text-center">Илрэхэд бэлэн</p>
                <br />
                <span className="fz-14">Наадам өрөө</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
