import { Player, Room, Table } from '@/types'
import { create } from 'zustand'

export type ModalType =
  | 'joinTable'
  | 'invite'
  | 'leaveTable'
  | 'buyChips'
  | 'buyIn'
  | 'rebuy'
  | 'rule'
  | 'quality'
  | 'feeling'
  | 'flush'
  | 'fullHouse'
  | 'straight'
  | 'straightFlush'
  | 'royalFlush'
  | 'fourCard'
  | 'winDefault'
  | 'autoRebuy'
  | 'tableCreator'
  | 'enterSpecificTable'

export interface ModalData {
  tableId?: string
  table?: Table
  player?: Player
  apiUrl?: string
  query?: Record<string, any>
  room?: Room
  rooms?: Room[]
  roomId?: string
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}))
