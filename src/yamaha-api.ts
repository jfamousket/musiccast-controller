/**
 * The Yamaha YXC Module Constructor.
 * @constructor
 * @param {string} ip - The ip of the yamaha receiver.
 *
 */
import axios, { AxiosInstance, AxiosPromise, Method } from "axios";

type State = "1" | "true" | "false" | boolean | 1 | 0;

export class YamahaYXC {
  catchRequestErrors: boolean;
  request: AxiosInstance;

  constructor(requestTimeout = 1000) {
    //for testing
    this.request = axios.create({
      timeout: requestTimeout,
    });
    this.catchRequestErrors = true;
  }

  //-------------- general Communication ---------------------------
  SendReqToDevice<T = unknown>(
    cmd: string,
    method: Method,
    body?: any
  ): AxiosPromise<T> {
    return this.request({
      method,
      data: body,
      url: process.env.REACT_APP_PROXY + "/YamahaExtendedControl/v1" + cmd,
      headers: {
        "X-AppName": "MusicCast/1.0",
        "X-AppPort": "41100",
        ProxyTo: "192.168.0.31",
      },
    });
  }

  async SendGetToDevice<T = unknown>(cmd: string) {
    return await this.SendReqToDevice<T>(cmd, "GET");
  }
  async SendPostToDevice(cmd: string, data: any) {
    return await this.SendReqToDevice(cmd, "POST", data);
  }

  //-------------Zone related comands----------
  async power(on: "true" | "false" | "on" | "off" | boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setPower?power=" +
        (on === "on" || on === true || on === "true" ? "on" : "standby");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async powerOn(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/setPower?power=on";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async powerOff(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/setPower?power=standby";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async sleep(val: number, zone: string) {
    if (val < 30) val = 0;
    else if (val < 60) val = 30;
    else if (val < 90) val = 60;
    else if (val < 120) val = 90;
    else val = 120;
    try {
      const command = "/" + this.getZone(zone) + "/setSleep?sleep=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setVolumeTo(to: string, zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/setVolume?volume=" + to;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async mute(on: "true" | "false" | boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setMute?enable=" +
        (on === "true" || on === true ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async muteOn(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/setMute?enable=true";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async muteOff(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/setMute?enable=false";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setInput(input: string, zone: string, mode: string) {
    if (mode == null || mode == "undefined") {
      mode = "";
    } else {
      mode = "&mode=" + mode;
    }
    //check for correct input in calling program
    try {
      const command =
        "/" + this.getZone(zone) + "/setInput?input=" + input + mode;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setSound(input: string, zone: string) {
    //check for correct input in calling program
    try {
      const command =
        "/" + this.getZone(zone) + "/setSoundProgram?program=" + input;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async surround(on: boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/set3dSurround?enable=" +
        (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async surroundOn(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/set3dSurround?enable=true";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async surroundOff(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/set3dSurround?enable=false";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setDirect(on: boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setDirect?enable=" +
        (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setPureDirect(on: boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setPureDirect?enable=" +
        (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setEnhancer(on: boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setEnhancer?enable=" +
        (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setClearVoice(on: boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setClearVoice?enable=" +
        (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setBassTo(val: number, zone: string) {
    try {
      const command =
        "/" + this.getZone(zone) + "/setToneControl?mode=manual&bass=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setTrebleTo(val: number, zone: string) {
    try {
      const command =
        "/" + this.getZone(zone) + "/setToneControl?mode=manual&treble=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setEqualizer(low: number, mid: number, high: number, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setEqualizer?mode=manual&low=" +
        low +
        "&mid=" +
        mid +
        "&high=" +
        high;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setBalance(val: number, zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/setBalance?value=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setSubwooferVolumeTo(val: number, zone: string) {
    try {
      const command =
        "/" + this.getZone(zone) + "/setSubwooferVolume?volume=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setBassExtension(on: boolean, zone: string) {
    try {
      const command =
        "/" +
        this.getZone(zone) +
        "/setBassExtension?enable=" +
        (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //get commands
  async getSignalInfo(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/getSignalInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getStatus(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/getStatus";
      const result = await this.SendGetToDevice<{
        response_code: number;
        power: "on" | "off";
        sleep: number;
        volume: number;
        mute: boolean;
        max_volume: number;
        input: "spotify";
        distribution_enable: boolean;
        equalizer: {
          mode: "manual";
          low: number;
          mid: number;
          high: number;
        };
        link_control: "standard";
        link_audio_quality: "uncompressed";
        disable_flags: number;
      }>(command);
      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getSoundProgramList(zone: string) {
    try {
      const command = "/" + this.getZone(zone) + "/getSoundProgramList";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //------------ NetUSB commands --------------
  async getPresetInfo() {
    try {
      const command = "/netusb/getPresetInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getSettings() {
    try {
      const command = "/netusb/getSettings";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getRecentInfo() {
    try {
      const command = "/netusb/getRecentInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearRecentInfo() {
    try {
      const command = "/netusb/clearRecentInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setNetPlayback(val: string) {
    if (!val || val == "play") val = "play";
    else if (val == "stop") val = "stop";
    else if (val == "pause") val = "pause";
    else if (val == "play_pause") val = "play_pause";
    else if (val == "previous") val = "previous";
    else if (val == "next") val = "next";
    else if (val == "frw_start") val = "fast_reverse_start";
    else if (val == "frw_end") val = "fast_reverse_end";
    else if (val == "ffw_start") val = "fast_forward_start";
    else if (val == "ffw_end") val = "fast_forward_end";
    try {
      const command = "/netusb/setPlayback?playback=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async toggleNetRepeat() {
    try {
      const command = "/netusb/toggleRepeat";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async toggleNetShuffle() {
    try {
      const command = "/netusb/toggleShuffle";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async storePreset(val: number) {
    if (typeof val !== "number")
      throw new Error("preset val must be specified");
    try {
      const command = "/netusb/storePreset?num=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearPreset(val: number) {
    if (typeof val !== "number")
      throw new Error("preset val must be specified");
    try {
      const command = "/netusb/clearPreset?num=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async recallPreset(val: number, zone: string) {
    if (typeof val !== "number") val = 1;
    try {
      const command =
        "/netusb/recallPreset?zone=" + this.getZone(zone) + "&num=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async stopNet() {
    try {
      const command = "/netusb/setPlayback?playback=stop";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async pauseNet() {
    try {
      const command = "/netusb/setPlayback?playback=pause";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async playNet() {
    try {
      const command = "/netusb/setPlayback?playback=play";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async nextNet() {
    try {
      const command = "/netusb/setPlayback?playback=next";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async prevNet() {
    try {
      const command = "/netusb/setPlayback?playback=previous";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async frwNet(state: State) {
    try {
      let on;
      if (state === "1" || state === true || state === 1 || state === "true") {
        on = 1;
      } else {
        on = 0;
      }
      const command =
        "/netusb/setDirect?playback=" +
        (on ? "fast_reverse_start" : "fast_reverse_end");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async ffwNet(state: State) {
    let on;
    if (state === "1" || state === true || state === 1 || state === "true") {
      on = 1;
    } else {
      on = 0;
    }
    try {
      const command =
        "/netusb/setDirect?playback=" +
        (on ? "fast_forward_start" : "fast_forward_end");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //----------- NETUSB list info -------------
  async getListInfo(input: string, index: string, size: string, lang: string) {
    if (size == null || size == "undefined") {
      size = "8";
    }
    if (lang == null || lang == "undefined") {
      lang = "";
    } else {
      lang = "&lang=" + lang;
    }
    try {
      const command =
        "/netusb/getListInfo?input=" +
        input +
        "&index=" +
        index +
        "&size=" +
        size +
        lang;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setListControl(
    listId: number,
    type: string,
    index: string,
    zone: string
  ) {
    if (index == null || index == "undefined") {
      index = "";
    } else {
      index = "&index=" + index;
    }
    if (zone == null || zone == "undefined") {
      zone = "";
    } else {
      zone = "&zone=" + zone;
    }
    try {
      const command =
        "/netusb/setListControl?list_id=" +
        listId +
        "&type=" +
        type +
        index +
        zone;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //-----------  NETUSB musiccast playlists ------------
  async getMCPlaylists() {
    try {
      const command = "/netusb/getMcPlaylistName";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getMCPlaylistContent(bank: string, index: number) {
    try {
      const command = "/netusb/getMcPlaylist?bank=" + bank + "&index=" + index;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async startMCPlaylistEn(bank: string, index: number, zone: string) {
    try {
      const command =
        "/netusb/manageMcPlaylist?bank=" +
        bank +
        "&type=play&index=" +
        index +
        "&zone=" +
        this.getZone(zone);
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //------------ NETUSB + CD + Tuner commands ------------
  async getPlayInfo(val: "cd" | "tuner" | "netusb") {
    try {
      let command;
      if (val === "cd") {
        command = "/cd/getPlayInfo";
      } else if (val === "tuner") {
        command = "/tuner/getPlayInfo";
      } else {
        command = "/netusb/getPlayInfo";
      }
      const result = await this.SendGetToDevice<{
        response_code: number;
        input: "spotify";
        play_queue_type: "system";
        playback: "play";
        repeat: "off" | "on";
        shuffle: "off" | "on";
        play_time: number;
        total_time: number;
        artist: string;
        album: string;
        track: string;
        albumart_url: string;
        albumart_id: number;
        usb_devicetype: "unknown";
        auto_stopped: boolean;
        attribute: number;
        repeat_available: Array<"off" | "one" | "all">;
        shuffle_available: Array<unknown>;
      }>(command);
      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //------------ NETUSB + CD commands ------------
  async toggleRepeat(val: string) {
    try {
      let command;
      if (val === "cd") {
        command = "/cd/toggleRepeat";
      } else {
        command = "/netusb/toggleRepeat";
      }
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async toggleShuffle(val: string) {
    try {
      let command;
      if (val === "cd") {
        command = "/cd/toggleShuffle";
      } else {
        command = "/netusb/toggleShuffle";
      }
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setPlayback(val: "play" | "pause" | string, where: string) {
    if (!val || val == "play") val = "play";
    else if (val == "stop") val = "stop";
    else if (val == "pause") val = "pause";
    else if (val == "play_pause") val = "play_pause";
    else if (val == "previous") val = "previous";
    else if (val == "next") val = "next";
    else if (val == "frw_start") val = "fast_reverse_start";
    else if (val == "frw_end") val = "fast_reverse_end";
    else if (val == "ffw_start") val = "fast_forward_start";
    else if (val == "ffw_end") val = "fast_forward_end";
    try {
      let command;
      if (where === "cd") {
        command = "/cd/setPlayback?playback=" + val;
      } else {
        command = "/netusb/setPlayback?playback=" + val;
      }
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  //------------ CD commands ------------
  async setCDPlayback(val: string) {
    if (!val || val == "play") val = "play";
    else if (val == "stop") val = "stop";
    else if (val == "pause") val = "pause";
    else if (val == "play_pause") val = "play_pause";
    else if (val == "previous") val = "previous";
    else if (val == "next") val = "next";
    else if (val == "frw_start") val = "fast_reverse_start";
    else if (val == "frw_end") val = "fast_reverse_end";
    else if (val == "ffw_start") val = "fast_forward_start";
    else if (val == "ffw_end") val = "fast_forward_end";
    try {
      const command = "/cd/setPlayback?playback=" + val;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async toggleTray() {
    try {
      const command = "/cd/toggleTray";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async toggleCDRepeat() {
    try {
      const command = "/cd/toggleRepeat";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async toggleCDShuffle() {
    try {
      const command = "/cd/toggleShuffle";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async stopCD() {
    try {
      const command = "/cd/setPlayback?playback=stop";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async pauseCD() {
    try {
      const command = "/cd/setPlayback?playback=stop";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async playCD() {
    try {
      const command = "/cd/setPlayback?playback=play";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async nextCD() {
    try {
      const command = "/cd/setPlayback?playback=next";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async prevCD() {
    try {
      const command = "/cd/setPlayback?playback=previous";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async frwCD(state: State) {
    let on;
    if (state === "1" || state === true || state === 1 || state === "true") {
      on = 1;
    } else {
      on = 0;
    }
    try {
      const command =
        "/cd/setDirect?playback=" +
        (on ? "fast_reverse_start" : "fast_reverse_end");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async ffwCD(state: State) {
    var on;
    if (state === "1" || state === true || state === 1 || state === "true") {
      on = 1;
    } else {
      on = 0;
    }
    try {
      const command =
        "/cd/setDirect?playback=" +
        (on ? "fast_forward_start" : "fast_forward_end");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //-------------System commands------
  async getDeviceInfo() {
    try {
      const command = "/system/getDeviceInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getFeatures() {
    try {
      const command = "/system/getFeatures";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getNetworkStatus() {
    try {
      const command = "/system/getNetworkStatus";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getFuncStatus() {
    try {
      const command = "/system/getFuncStatus";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getNameText(zone: string) {
    try {
      const command = "/system/getNameText?id=" + zone;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getLocationInfo() {
    try {
      const command = "/system/getLocationInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setAutoPowerStandby(state: State, zone: string) {
    let on;
    if (state === "1" || state === true || state === 1 || state === "true") {
      on = 1;
    } else {
      on = 0;
    }
    try {
      const command =
        "/system/setAutoPowerStandby?enable=" + (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setHdmiOut1(
    state: "1" | "true" | "false" | boolean | 1 | 0,
    zone: string
  ) {
    let on;
    if (state === "1" || state === true || state === 1 || state === "true") {
      on = 1;
    } else {
      on = 0;
    }
    try {
      const command = "/system/setHdmiOut1?enable=" + (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setHdmiOut2(
    state: "1" | "true" | "false" | boolean | 1 | 0,
    zone: string
  ) {
    let on;
    if (state === "1" || state === true || state === 1 || state === "true") {
      on = 1;
    } else {
      on = 0;
    }
    try {
      const command = "/system/setHdmiOut2?enable=" + (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setPartyMode(on: boolean) {
    try {
      const command = "/system/setPartyMode?enable=" + (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //-----------  advanced ------------
  async setLinkControl(control: string, zone: string) {
    try {
      const command =
        "/" + this.getZone(zone) + "/setLinkControl?control=" + control;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setLinkAudioDelay(delay: number, zone: string) {
    try {
      const command =
        "/" + this.getZone(zone) + "/setLinkAudioDelay?delay=" + delay;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setLinkAudioQuality(mode: string, zone: string) {
    try {
      const command =
        "/" + this.getZone(zone) + "/setLinkAudioQuality?delay=" + mode;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getDistributionInfo() {
    try {
      const command = "/dist/getDistributionInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setServerInfo(data: any) {
    try {
      const command = "/dist/setServerInfo";
      const result = await this.SendPostToDevice(command, data);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setClientInfo(data: any) {
    try {
      const command = "/dist/setClientInfo";
      const result = await this.SendPostToDevice(command, data);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async startDistribution(num: number) {
    try {
      const command = "/dist/startDistribution?num=" + num;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async stopDistribution() {
    try {
      const command = "/dist/stopDistribution";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setGroupName(name: string) {
    try {
      const command = "/dist/setGroupName";
      const result = await this.SendPostToDevice(command, name);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //-----------  Tuner ------------
  async getTunerPresetInfo(band: number) {
    try {
      const command = "/tuner/getPresetInfo?band=" + band;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getTunerPlayInfo() {
    try {
      const command = "/tuner/getPlayInfo";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setBand(band: number) {
    try {
      const command = "/tuner/setBand?band=" + band;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setFreqDirect(band: number, freq: number) {
    try {
      const command =
        "/tuner/setFreq?band=" + band + "&tuning=direct&num=" + freq;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async switchPresetTuner(direction: string) {
    try {
      const command = "/tuner/switchPreset?dir=" + direction;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setDabService(direction: string) {
    try {
      const command = "/tuner/setDabService?dir=" + direction;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //-----------  Clock ------------
  async getClockSettings() {
    try {
      const command = "/clock/getSettings";
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setClockAutoSync(state: boolean | "true" | "1" | 1) {
    let on;
    if (state === "1" || state === true || state === 1 || state === "true") {
      on = 1;
    } else {
      on = 0;
    }
    try {
      const command = "/clock/setAutoSync?enable=" + (on ? "true" : "false");
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setClockDateTime(datetime: any) {
    try {
      const command = "/clock/setDateAndTime?date_time=" + datetime;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setClockFormat(format: any) {
    try {
      const command = "/clock/setClockFormat?format=" + format;
      const result = await this.SendGetToDevice(command);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async setAlarmSettings(data: any) {
    try {
      const command = "/clock/SetAlarmSettings";
      const result = await this.SendPostToDevice(command, data);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // ---- zone number to string
  getZone(zone: string | number) {
    if (!zone) return "main";
    if (typeof zone === "string" && zone.length === 1) {
      zone = zone.replace("/^1", "main");
      zone = zone.replace("/^2", "zone2");
      zone = zone.replace("/^3", "zone3");
      zone = zone.replace("/^4", "zone4");
    }
    switch (zone) {
      case 1:
        zone = "main";
        break;
      case 2:
      case 3:
      case 4:
        zone = "zone" + zone;
    }
    return zone;
  }
}
