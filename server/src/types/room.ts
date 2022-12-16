import { Document } from "mongoose"

export interface IRoom extends Document {
  name: string
  description: string
  status: "booked" | "free",
  numberOfDesks: number
}