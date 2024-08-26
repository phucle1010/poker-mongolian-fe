'use client'

import { Player, PokerActions, TableWithPlayers } from '@/types'
import { TableList } from './list'
import Pagination from './pagination'
import { useSocket } from '@/providers/socket-provider'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import tableApi from '@/services/api/modules/table-api'
import { toast } from 'sonner'
import { useMountedState } from 'react-use'
import { Loader } from 'lucide-react'
import { useModal } from '@/store/use-modal-store'

interface TableContentProps {}

export const TableContent = ({}: TableContentProps) => {
  const isMounted = useMountedState()
  const { onOpen } = useModal()
  const { socket } = useSocket()
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId')
  const [tableList, setTableList] = useState<TableWithPlayers[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!searchParams || !searchParams.get('roomId')) return
    fetchTables()
  }, [searchParams])

  useEffect(() => {
    if (!socket) return

    socket.on(
      PokerActions.LEAVE_TABLE,
      ({ tableId, playerId }: { tableId: string; playerId: string }) => {
        setTableList(prev =>
          prev.map(table => {
            if (table.id === tableId) {
              return {
                ...table,
                players: (table?.players ?? []).filter(
                  player => player.id !== playerId
                ),
              }
            }
            return table
          })
        )
      }
    )
    socket.on(
      PokerActions.JOIN_TABLE,
      ({ tableId, player }: { tableId: string; player: Player }) => {
        setTableList(prev =>
          prev.map(table => {
            if (table.id === tableId) {
              const updatedPlayers = (table.players ?? []).filter(
                p => p.id !== player.id
              )

              return {
                ...table,
                players: [...updatedPlayers, player],
              }
            }
            return table
          })
        )
      }
    )

    return () => {
      socket.off(PokerActions.LEAVE_TABLE)
      socket.off(PokerActions.JOIN_TABLE)
    }
  }, [socket])

  const fetchTables = async () => {
    if (!roomId) return

    setLoading(true)
    const { response, error } = await tableApi.getTablesByRoom({ roomId })

    if (error) {
      toast.error('Хүснэгтүүдийг авч чадсангүй')
    }

    if (response) {
      setTableList(response?.tables as TableWithPlayers[])
    }
    setLoading(false)
  }

  if (!isMounted) return <TableContentLoading />

  return (
    <div className="content_main p-0 rounded-none">
      <div className="inner">
        <div className="form_custom form_room w-full new-version flex flex-row gap-2">
          <div className="!justify-start ">
            <TableList
              tables={tableList}
              loading={loading}
              roomId={roomId ?? ''}
            />
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
  )
}

const TableContentLoading = () => {
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
