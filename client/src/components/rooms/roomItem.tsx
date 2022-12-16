import { Button, Card, CardContent, CardHeader, createStyles, Grid, makeStyles, Typography } from "@material-ui/core"
import { Delete, Edit } from "@material-ui/icons"
import React, { useState } from "react"

type Props = RoomProps & {
  updateRoom: (room: IRoom) => void
  deleteRoom: (_id: string) => void
}

const useStyles = makeStyles(theme=>createStyles({
    card:{
        width:"100%",
        margin:10,
        borderRadius:8,
        boxShadow:"30",
        transition: "transform 0.10s linear",
        "&:hover": { transform: "scale3d(1.15, 1.05, 1)", border:"1px solid"},
    },
    bookButton:{
        fontSize:"1rem",
        color:"#FFFFFF",
    }}
))

const RoomItem:React.FC<Props>=({room,updateRoom,deleteRoom})=>{
    const classes = useStyles()
    return( <Card className={classes.card} >
        <CardContent>
        <Grid container justifyContent="space-between">
            <Grid item>
                <Typography variant="h5">{room.name}</Typography>
            </Grid>
            <Grid item style={{margin:5}}>
                <Button variant="contained" color='primary' style={{marginRight:5}}><Edit /></Button>
                <Button variant="contained" color="secondary" onClick={()=>deleteRoom(room._id)}><Delete /></Button>
            </Grid>
        </Grid>
        </CardContent>

        <CardContent>
            <Grid container justifyContent="center" >
                    <img src={`/${room.name.toLowerCase().split(" ").join("-")}.jpeg`} width={"100%"} height={300} alt={room.description} style={{filter:room.status==="booked"?"grayscale(1)":"grayscale(0)"}}/>
                    <Typography variant="h6">{room.description}</Typography>
            </Grid>
            {room.numberOfDesks===0 && (<Grid container justifyContent="space-between">
                <Button disabled style={{background:room.status==="free"?"green":"red", color:"white", width:200}}>{room.status}</Button>
                <Button variant="contained" color="primary" className={classes.bookButton} onClick={()=>updateRoom(room)}>{room.status==="free"?"Book Now":"Unbook"}</Button>
                </Grid>)}
            {room.numberOfDesks>0 && <Typography variant="h6">Desks: {room.numberOfDesks}</Typography>}
        </CardContent>

    </Card>)
}

export default RoomItem