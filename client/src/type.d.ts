interface IRoom {
    _id: string
    name: string
    description: string
    status: string,
    numberOfDesks: number,
    createdAt?: string
    updatedAt?: string
  }
  
  interface RoomProps {
    room: IRoom
  }
  
  type ApiDataType = {
    message: string
    status: string
    rooms: IRoom[]
    room: IRoom
  }