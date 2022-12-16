import { IRoom } from './../types/room';
import { model, Schema } from "mongoose"

const roomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default:"free"
    },
    numberOfDesks:{
      type:Number,
      required:true,
      default:0
    }
  },
  { timestamps: true }
)

export default model<IRoom>("Room", roomSchema)