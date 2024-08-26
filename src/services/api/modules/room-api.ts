import publicClient from '@/services/api/client/private-client'

const roomEndpoints = {
  getRoomById: ({ roomId }: { roomId: string }) => `rooms/${roomId}`,
  getRooms: ({ page }: { page: string }) => `rooms?page=${page}`,
  getRoomsWithoutCondition: () => 'rooms/select'
}

const roomApi = {
  getRoomById: async (data: { roomId: string }) => {
    try {
      const response = await publicClient.get(roomEndpoints.getRoomById(data))
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getRooms: async ({ page }: { page: string }) => {
    try {
      const response = await publicClient.get(
        roomEndpoints.getRooms({ page })
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getRoomsWithoutCondition: async () => {
    try {
        const response = await publicClient.get(
            roomEndpoints.getRoomsWithoutCondition()
        )
        if (response && response.data) return { response: response.data }
        return { response }
    } catch (error) {
        return { error }
    }
  }
}

export default roomApi
