import { Button, createStyles, Grid, List, ListItem, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { addRoom, deleteRoom, getRooms, updateRoom } from './api'
import Navbar from './components/navigation/navbar'
import RoomItem from './components/rooms/roomItem'
import SearchBar from './components/searchBar'

const useStyles = makeStyles(theme=>createStyles({
  roomHeaderGrid:{
    margin:20
  },
  createRoomGrid:{
    margin:20
  }
}))

const App: React.FC = () => {
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [searchRoom,setSearchRoom] = useState<boolean>(false) 
  const classes = useStyles()
  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = (): void => {
    getRooms()
    .then(({ data: { rooms } }: IRoom[] | any) => setRooms(rooms))
    .catch((err: Error) => console.log(err))
  }

  const handleSaveRoom = (e: React.FormEvent, formData: IRoom): void => {
    e.preventDefault()
    addRoom(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Room not saved")
        }
        setRooms(data.rooms)
      })
      .catch(err => console.log(err))
  }


const handleUpdateRoom = (room: IRoom): void => {
  updateRoom(room)
    .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error! Room not updated")
      }
      setRooms(data.rooms)
    })
    .catch(err => console.log(err))
}

const handleDeleteRoom = (_id: string): void => {
  deleteRoom(_id)
    .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error! Todo not deleted")
      }
      setRooms(data.rooms)
    })
    .catch(err => console.log(err))
}

return (
  <main className='App'>
    <Navbar />
    <Grid container justifyContent="center" className={classes.roomHeaderGrid}>
      <Typography variant="h4">Rooms</Typography>
    </Grid>
    <Grid container justifyContent="center" className={classes.createRoomGrid}>
      <Button variant="contained" color="primary" disabled>Create Room</Button>
    </Grid>
    <Grid container justifyContent="center">
    <SearchBar rooms={rooms} setSearchRoom={setSearchRoom} setRooms={setRooms}/>
    </Grid>
    <Grid container justifyContent="center" style={{display:searchRoom===true?"none":""}}>
      <List>
      {rooms.map((room: IRoom) => (
          <ListItem key={room._id}>
            <RoomItem
            updateRoom={handleUpdateRoom}
            deleteRoom={handleDeleteRoom}
            room={room}
          />
          </ListItem>

      ))}
      </List>
    </Grid>
  </main>
)
}

export default App