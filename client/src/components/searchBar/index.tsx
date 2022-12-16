import { Button, createStyles, Grid, List, ListItem, makeStyles, TextField, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useState, FC, SetStateAction } from "react";
import { deleteRoom, updateRoom } from "../../api";
import RoomItem from "../rooms/roomItem";

interface SearchBarProps{
    rooms: IRoom[],
    setSearchRoom:(arg:boolean)=>void,
    setRooms:(arg:IRoom[])=>void
}

const useStyles = makeStyles(theme=>createStyles({
    roomCardGrid:{
        marginTop:theme.spacing(5)
    },
    searchGrid:{
      marginRight:theme.spacing(0.5),
      width:"40%"
    }
}))

const SearchBar:FC<SearchBarProps> = ({rooms,setSearchRoom,setRooms}) => {
    const classes = useStyles();
    const [search,setSearch] = useState<string>("");
    const [roomMatch,setRoomMatch] = useState<IRoom[]>([]);
    const [roomFound,setRoomFound] = useState<boolean>(false);

    const handleSetSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
      // set the value searched for only if input is not empty string.
        if(e.target.value!==""){
            setSearch(e.target.value);
        }
        else{
            setSearch("");
            setSearchRoom(false);
            setRoomMatch([]);
            setRoomFound(false);
        }
      }
      
      const handleSearchRoom = () => {
        //filter room from list of rooms matching search input
        const searchResult = rooms.filter(room=>room.name.toLowerCase()===search.toLowerCase());
        setRoomMatch(searchResult);
        if(searchResult!==undefined) setRoomFound(true);
        else setRoomFound(false);
        setSearchRoom(true)
      }

      const handleUpdateRoom = (room: IRoom): void => {
         updateRoom(room)
          .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error("Error! Room not updated")
            }
            rooms = data.rooms;
            handleSearchRoom();
            setRooms(rooms);
          })
          .catch(err => console.log(err))
      }
      
      const handleDeleteRoom = (_id: string): void => {
        deleteRoom(_id)
          .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error("Error! Room not deleted")
            }
            setRoomMatch(data.rooms)
          })
          .catch(err => console.log(err))
      }

    return (
    <>
      <Grid container justifyContent="center">
        <TextField name="searchRoom" variant="outlined" onChange={handleSetSearch} className={classes.searchGrid}/>
        <Button variant="contained" color="primary" disabled={search===""} onClick={handleSearchRoom}><Search /></Button>
      </Grid>
      <Grid container justifyContent="center" className={classes.roomCardGrid} style={{display:search===""?"none":""}}>
            {roomMatch.length > 0 ? (
                <List>
                  {roomMatch.map((room: IRoom) => (
                      <ListItem key={room._id}>
                        <RoomItem
                          updateRoom={handleUpdateRoom}
                          deleteRoom={handleDeleteRoom}
                          room={room}
                        />
                      </ListItem>
                  ))}
                </List>
            ):(roomFound && <Typography variant="h5">{`No room with the name ${search} could be found! Please try again`}</Typography>)}

      </Grid>
    </>
)}

export default SearchBar