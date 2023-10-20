import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser";

export default class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
  }

  controlAudio(status) {
    this.setState({
      status,
    });
  }

  changeScheme(e) {
    this.setState({
      audioType: e.target.value,
    });
  }

  componentDidMount() {
    this.setState({
      audioType: "audio/wav",
    });
  }

  render() {
    const { status, audioSrc, audioType } = this.state;
    const audioProps = {
      audioType,
      // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
      status,
      audioSrc,
      timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
      startCallback: (e) => {
        console.log("successful start", e);
      },
      pauseCallback: (e) => {
        console.log("successful pause", e);
      },
      stopCallback: (e) => {
        this.setState({
          // audioSrc: window.URL.createObjectURL(e),
        });
        console.log("successful stop", e);

        // Send the audio blob to the endpoint
        const formData = new FormData();
        formData.append("file", e, "recorded_audio.wav"); // 'e' is the audio blob

        // fetch("http://localhost:8000/upload_audio/", {
        fetch("https://api.mekaelwasti.com:63030/upload_audio", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            this.props.onAudioProcessed(data.message); // Using the prop function to send data back to the parent
            console.log("YEAH");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
      onRecordCallback: (e) => {
        console.log("recording", e);
      },
      errorCallback: (err) => {
        console.log("error", err);
      },
    };
    return (
      <div>
        <AudioAnalyser {...audioProps} className="audio_analyser">
          <div className="btn-box">
            <button
              className="btn"
              onClick={() => this.controlAudio("recording")}
            >
              START
            </button>
            {/* <button className="btn" onClick={() => this.controlAudio("paused")}>
              Pause
            </button> */}
            <button
              className="btn"
              onClick={() => this.controlAudio("inactive")}
            >
              STOP
            </button>
            {/* <button className="btn" onClick={() => console.log(AudioAnalyser)}>
              Log
            </button> */}
          </div>
        </AudioAnalyser>
        {/* <p>choose output type</p>
        <select
          name=""
          id=""
          onChange={(e) => this.changeScheme(e)}
          value={audioType}
        >
          <option value="audio/webm">audio/webm（default）</option>
          <option value="audio/wav">audio/wav</option>
          <option value="audio/mp3">audio/mp3</option>
        </select> */}
      </div>
    );
  }
}
