import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Divider, Form, Grid, GridColumn, GridRow, Icon, Input, Table, TableRow } from 'semantic-ui-react'
import App, { dateChange } from './App'
import { Items } from './IYoutube'
import { getVideo } from './Services'


export default function VideoPage(props:any) {
    const [search, setSearch] = useState("") 

const [status, setStatus] = useState(false)
const [videoList, setVideoList] = useState<any[]>([])
const [favStatus, setFavStatus] = useState(false)
const [favWatches, setFavWatches] = useState([])




    const [detail, setDetail] = useState<Items>()
    const detay:any=localStorage.getItem("currentVideo")
    
    console.log(detail)
    
    useEffect(() => {
        setDetail(JSON.parse(detay))

        const favss:any=localStorage.getItem("favVideos")
        const arrxx=(JSON.parse(favss))
        setFavWatches(arrxx)

    }, [])

    function favAdd(data:any){
        setFavStatus(!favStatus)
        let favs:any=[]
        if(favStatus!==true){
            
        favs.push(data)
        if(localStorage.getItem("favVideos")===null){
            localStorage.setItem("favVideos",JSON.stringify(favs))
        }else{
            const favss:any=localStorage.getItem("favVideos")
            const arrxx=(JSON.parse(favss))
            arrxx.push(data)
            localStorage.setItem("favVideos",JSON.stringify(arrxx))
        }
        }
        else{
           const favsArr = favWatches.filter((x: any) => x.id.videoId !== detail?.id.videoId); 
           localStorage.setItem("favVideos",JSON.stringify(favsArr))
        }
        
        
    }
    const history=useHistory()
    function locals(videoLink:any,data:Items){
        history.push("/videoPage/" + videoLink)
        localStorage.setItem("currentVideo",JSON.stringify(data))
        
      }

    return (
        <>
        <Container>
       



            <Grid columns={2}>
                <GridRow>
                    <GridColumn>
            <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/" + detail?.id.videoId}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <Button color={favStatus ? "red" : "grey"}
      content={favStatus ? "Liked" : "Like"}
      onClick={()=>favAdd(detail)} 
        icon="heart"
     />
        </GridColumn>

            <GridColumn>
                <TableRow><Table.Cell><b>Title:</b> {detail?.snippet.title}</Table.Cell></TableRow>
                <br/>
                <TableRow><Table.Cell><b>Detail:</b> {detail?.snippet.description}</Table.Cell></TableRow>
                <br/>
                <TableRow><Table.Cell><b>Published At:</b> {dateChange(detail?.snippet.publishedAt)}</Table.Cell></TableRow>
                <br/>
                <TableRow><Table.Cell><b>Channel Title:</b> {detail?.snippet.channelTitle}</Table.Cell></TableRow>
        
        </GridColumn>
      </GridRow>
      </Grid>
        </Container>
        </>

    )
}
