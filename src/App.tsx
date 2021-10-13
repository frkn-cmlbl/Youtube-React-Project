import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Divider,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Input,
  Label,
  Table,
} from "semantic-ui-react";
import { Items } from "./IYoutube";
import { getVideo } from "./Services";
import VideoPage from "./VideoPage";

export function dateChange(string: any){
  let options: any = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}



function App() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState(false);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [favVideo, setFavVideo] = useState<any>([]);
  const [lastVideo, setLastVideo] = useState<any[]>([]);

 
  useEffect(() => {
    const arrFav: any = localStorage.getItem("favVideos");
    const arrFavx = JSON.parse(arrFav)||[];
    const favSlice=arrFavx.slice(-6)
    setFavVideo(favSlice);

    const arrLast:any=localStorage.getItem("lastVideosLocal")
    const arrLastx=JSON.parse(arrLast)||[];
    const arrSlice=arrLastx.slice(-6)
    setLastVideo(arrSlice)
    console.log("arrFaxx :>> ", arrFav);
  }, []);
  console.log(favVideo);

  const history = useHistory();

  function holdLocal(videoLink: any, data: Items) {
    history.push("/videoPage/" + videoLink);
    localStorage.setItem("currentVideo", JSON.stringify(data));

    const lastVideos: any = [];
    lastVideos.push(data);
    if (localStorage.getItem("lastVideosLocal") === null) {
      localStorage.setItem("lastVideosLocal", JSON.stringify(lastVideos));
    } else {
      const lastWatch: any = localStorage.getItem("lastVideosLocal");
      const arrxx = JSON.parse(lastWatch);
      arrxx.push(data);
      localStorage.setItem("lastVideosLocal", JSON.stringify(arrxx));

    }
  }

  return (
    <>
      <Container textAlign="center">
        <Grid>
          <GridRow centered={true}>
            <Form>
              <Input
                onChange={(evt) => setSearch(evt.target.value)}
                focus
                placeholder="Search..."
              />
              <Button
                secondary
                onClick={() => {
                  getVideo(search).then((res) => {
                    setVideoList(res.data.items);
                    console.log(videoList);
                    setStatus(true);
                  });
                }}
              >
                Ara
              </Button>
            </Form>
          </GridRow>
        </Grid>
        <hr />
        {status &&
          videoList.map((item, index) => {
            return (
              <>
                <Table.Row
                  key={index}
                  onClick={() => holdLocal(item.id.videoId, item)}
                >
                  <Table.Cell >
                    <img src={item.snippet.thumbnails.default.url} />
                  </Table.Cell>
                  <Table.Cell verticalAlign="middle" textAlign="center">{item.snippet.title}</Table.Cell>
                  
                </Table.Row>
              </>
            );
          })}
        <Divider horizontal/>
            <h2>Son İzlenenler</h2>
            <Grid columns={6}>
          <GridRow>
            {lastVideo &&
              lastVideo.map((item: any, index: any) => {
                return (
                  <GridColumn stretched>
                    <Card
                    fluid
                      key={index}
                      onClick={() => holdLocal(item.id.videoId, item)}
                    >
                      <img src={item.snippet.thumbnails.default.url} />
                      <Card.Content>
                        <Card.Header>{item.snippet.title}</Card.Header>
                        <Card.Meta>
                          <span className="date">
                            {dateChange(item.snippet.publishedAt)}
                          </span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </GridRow>
        </Grid>

        <Divider horizontal/>

        <h2>Favoriler</h2>
        <Grid columns={6}>
          <GridRow>
            {favVideo &&
              favVideo.map((item: any, index: any) => {
                return (
                  <GridColumn stretched>
                    <Card
                    fluid
                      key={index}
                      onClick={() => holdLocal(item.id.videoId, item)}
                    >
                      <img src={item.snippet.thumbnails.default.url} />
                      <Card.Content>
                        <Card.Header>{item.snippet.title}</Card.Header>
                        <Card.Meta>
                          <span className="date">
                          {dateChange(item.snippet.publishedAt)}
                          </span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </GridRow>
        </Grid>
      </Container>
    </>
  );
}

export default App;
