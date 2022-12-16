import { IRoom } from './../../types/room';
import { Response, Request } from "express"
import Room from "../../models/room"

const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms: IRoom[] = await Room.find()
    res.status(200).json({ rooms })
  } catch (error) {
    throw error
  }
}

const addRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<IRoom, "name" | "description" | "status" | "numberOfDesks">
  
      const room: IRoom = new Room({
        name: body.name,
        description: body.description,
        status: body.status,
        numberOfDesks: body.numberOfDesks
      })
  
      const newRoom: IRoom = await room.save()
      const allRooms: IRoom[] = await Room.find()
  
      res
        .status(201)
        .json({ message: "Room has been created!", room: newRoom, rooms: allRooms })
    } catch (error) {
      throw error
    }
}

const updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateRoom: IRoom | null = await Room.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allRooms: IRoom[] = await Room.find()
      res.status(200).json({
        message: "Room has been updated",
        room: updateRoom,
        rooms: allRooms,
      })
    } catch (error) {
      throw error
    }
}

const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedRoom: IRoom | null = await Room.findByIdAndRemove(
        req.params.id
      )
      const allRooms: IRoom[] = await Room.find()
      res.status(200).json({
        message: "Room has been deleted",
        room: deletedRoom,
        rooms: allRooms,
      })
    } catch (error) {
      throw error
    }
}
  
export { getRooms, addRoom, updateRoom, deleteRoom }