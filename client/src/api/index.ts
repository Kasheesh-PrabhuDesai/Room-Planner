import axios, { AxiosResponse } from "axios"

//CRUD applications

const baseUrl: string = "http://localhost:4000"

export const getRooms = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const rooms: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/rooms"
    )
    return rooms
  } catch (error) {
    throw error
  }
}

export const addRoom = async (
    formData: IRoom
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const room: Omit<IRoom, "_id"> = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        numberOfDesks: formData.numberOfDesks
      }
      const saveRoom: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/add-room",
        room
      )
      return saveRoom
    } catch (error) {
      throw error
    }
}

export const updateRoom = async (
    room: IRoom
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const roomUpdate: Pick<IRoom, "status"> = {
        status: room.status === "booked" ? "free" : "booked",
      }
      const updatedRoom: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/edit-room/${room._id}`,
        roomUpdate
      )
      return updatedRoom
    } catch (error) {
      throw error
    }
}

export const deleteRoom = async (
    _id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedRoom: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-room/${_id}`
      )
      return deletedRoom
    } catch (error) {
      throw error
    }
}