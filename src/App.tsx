import React from "react";
import {
  Grommet,
  Box,
  Grid,
  Button,
  Text,
  Card,
  CardBody,
  Image,
  RangeInput,
} from "grommet";
import {
  Menu,
  Volume,
  ChapterPrevious,
  Play,
  Stop,
  ChapterNext,
  Pause,
  VolumeMute,
  Power,
} from "grommet-icons";
import { yamaha } from "./api";
import { theme } from "./theme";
import { useInterval } from "react-use";
import { capitalize, throttle } from "lodash";
import { delay } from "./helpers";

type State = {
  albumArt: string;
  playing: boolean;
  mute: boolean;
  volume: number;
  volumeMax: number;
  input: string;
  artist: string;
  album: string;
  power: boolean;
};

const reducer = (
  prev: State,
  cur: ((s: State) => Partial<State>) | Partial<State>
) => ({
  ...prev,
  ...(typeof cur === "function" ? cur(prev) : cur),
});

const App = () => {
  const [state, setState] = React.useReducer<typeof reducer, State>(
    reducer,
    {
      albumArt:
        "https://www.gothiccountry.se/images/pictures2/no_album_art__no_cover.jpg",
      playing: false,
      mute: false,
      volume: 0,
      volumeMax: 100,
      input: "Unknown",
      artist: "Artist",
      album: "Album",
      power: false,
    },
    (s) => s
  );

  const update = React.useCallback(() => {
    yamaha.getStatus("main").then((status) => {
      return yamaha.getPlayInfo("netusb").then((info) => {
        setState({
          albumArt: info.albumart_url,
          playing: info.playback === "play",
          mute: status.mute,
          volume: status.volume,
          volumeMax: status.max_volume,
          artist: info.artist,
          album: info.album,
          input: status.input,
          power: status.power === "on",
        });
      });
    });
  }, []);

  useInterval(() => {
    update();
  }, 5000);

  return (
    <Grommet full theme={theme}>
      <Box fill="vertical" overflow="auto" align="center" flex="grow">
        <Grid
          columns={["xxsmall", "flex", "xxsmall"]}
          fill="horizontal"
          gap="medium"
          pad="small"
        >
          <Button
            icon={<Menu />}
            hoverIndicator={{ color: "active-background" }}
            active={false}
          />
          <Box align="center" justify="center">
            <Text textAlign="center" truncate={false} size="xlarge">
              Music Cast Controller
            </Text>
          </Box>
        </Grid>
        <Grid fill="vertical" pad="medium">
          <Card
            background={{ color: "background-front" }}
            fill="vertical"
            flex="shrink"
          >
            <CardBody
              pad="small"
              justify="start"
              direction="column"
              gap="xsmall"
              align="center"
              fill="vertical"
              width={{ max: "large", min: "medium", width: "medium" }}
            >
              <Box fill="vertical" height="small">
                <Image src={state.albumArt} fill fit="cover" />
              </Box>
              <Grid fill="horizontal" columns={["xsmall", "flex", "xsmall"]}>
                <Box align="start" justify="center">
                  <Text>{capitalize(state.input)}</Text>
                </Box>
                <Box align="center" justify="center">
                  <Text
                    textAlign="start"
                    style={{
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {state.artist} - {state.album}
                  </Text>
                </Box>
                <Box align="end" justify="center">
                  <Button
                    onClick={() => yamaha.power(!state.power, "main")}
                    icon={<Power />}
                    hoverIndicator
                  />
                </Box>
              </Grid>
              <Grid
                columns={[
                  "xxsmall",
                  "flex",
                  "xxsmall",
                  "xxsmall",
                  "xxsmall",
                  "xxsmall",
                ]}
                fill="horizontal"
              >
                <Button
                  onClick={() => {
                    yamaha
                      .mute(!state.mute, "main")
                      .then(() => setState({ mute: !state.mute }));
                  }}
                  icon={state.mute ? <VolumeMute /> : <Volume />}
                  hoverIndicator
                />
                <Box align="center" justify="center" flex>
                  <RangeInput
                    max={state.volumeMax}
                    min={0}
                    step={1}
                    onChange={(e) => {
                      setState({ volume: Number(e.target.value) });
                      yamaha.setVolumeTo(e.target.value, "main");
                    }}
                    value={state.volume}
                  />
                </Box>
                <Button
                  onClick={() =>
                    yamaha
                      .prevNet()
                      .then(() => delay(500))
                      .then(() => update())
                  }
                  icon={<ChapterPrevious />}
                  hoverIndicator
                />
                <Button
                  onClick={() => {
                    setState({ playing: !state.playing });
                    yamaha.setPlayback("pause", "main");
                  }}
                  icon={state.playing ? <Pause /> : <Play />}
                  hoverIndicator
                />
                <Button icon={<Stop />} hoverIndicator />
                <Button
                  icon={
                    <ChapterNext
                      onClick={() =>
                        yamaha
                          .nextNet()
                          .then(() => delay(500))
                          .then(() => update())
                      }
                    />
                  }
                  hoverIndicator
                />
              </Grid>
            </CardBody>
          </Card>
        </Grid>
      </Box>
    </Grommet>
  );
};

export default App;
