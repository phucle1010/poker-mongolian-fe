import publicClient from '@/services/api/client/private-client'
import type { TableCreatorRequest } from "@/components/modals/create-table-modal"

const tableEndpoints = {
  getTableById: ({ tableId }: { tableId: string }) => `tables/${tableId}`,
  getTables: ({ page }: { page: string }) => `tables?page=${page}`,
  switchTable: ({ tableId }: { tableId: string }) => `tables/switch/${tableId}`,
  checkTableSecret: () => `tables/validate`,
  createTable: () => `tables`,
  getTablesByRoom: ({ roomId }: { roomId: string }) => `tables/active?roomId=${roomId}`,
  joinRandomTable: () => `tables/join-random`
}

const tableApi = {
  getTableById: async (data: { tableId: string }) => {
    try {
      const response = await publicClient.get(tableEndpoints.getTableById(data))
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getTables: async ({ page }: { page: string }) => {
    try {
      const response = await publicClient.get(
        tableEndpoints.getTables({ page })
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  switchTable: async ({
    tableId,
    playerId,
  }: {
    tableId: string
    playerId: string
  }) => {
    try {
      const response = await publicClient.post(
        tableEndpoints.switchTable({ tableId }),
        { playerId }
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  checkTableSecret: async ({
      code, 
      pass,
      roomId
    }: {
      code: string
      pass: string
      roomId: string
    }) => {
      try {
        const response = await publicClient.post(
          tableEndpoints.checkTableSecret(), 
          { code, pass, roomId }
        )
        if (response && response.data) return { response: response.data }
        return { response }
      } catch (error) {
        return { error }
      }
    },
    createTable: async ({ data }: { data: TableCreatorRequest }) => {
      try {
        const response = await publicClient.post(tableEndpoints.createTable(), data)
        if (response && response.data) return { response: response.data }
        return { response }
      } catch (error) {
        return { error }
      }
    },
    getTablesByRoom: async ({ roomId }: { roomId: string }) => {
      try {
        const response = await publicClient.get(
          tableEndpoints.getTablesByRoom({ roomId })
        )
        if (response && response.data) return { response: response.data }
        return { response }
      } catch (error) {
        return { error }
      }
    },
    joinRandomTable: async ({ currentChipsOfUser }: { currentChipsOfUser: number }) => {
      try {
        const response = await publicClient.post(tableEndpoints.joinRandomTable(), { currentChipsOfUser })
        if (response && response.data) return { response: response.data }
        return { response }
      } catch (error) {
        return { error }
      }
    }
}

export default tableApi
