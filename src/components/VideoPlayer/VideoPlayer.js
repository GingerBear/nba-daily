import React, { Component } from 'react';
import { setGlobalState } from '../../lib/global-state';
import './VideoPlayer.css';

const isAndroid = window.navigator.userAgent.indexOf('Android') > -1;

class VideoPlayer extends Component {

  playVideo = (urlSrc) => {
    this.videoPlayer = document.createElement('video');
    this.videoPlayer.src = urlSrc;
    this.videoPlayer.controls = true;
    this.videoPlayer.addEventListener('ended', this.onVideoEnded, false);
    this.videoPlayer.play();

    if (isAndroid) {
      this.refs.videoContainer.innerHTML = '';
      this.refs.videoContainer.appendChild(this.videoPlayer);
    }
  }

  onVideoEnded = (event) => {
    this.videoPlayer.webkitExitFullscreen();
  }

  componentWillReceiveProps(nextProps) {
    this.retryPlay(nextProps.video);
  }

  componentDidMount() {
    this.retryPlay(this.props.video);
  }

  retryPlay = (vid) => {
    if (vid) {
      this.playVideo(vid);
    } else {
      if (this.videoPlayer) this.videoPlayer.remove();
      this.refs.videoContainer.innerHTML = '';
    }
  }

  close = (e) => {
    setGlobalState({
      videoPlaying: null
    })
  }

  render() {
    return <div>
      <div ref="videoContainer" className="videoContainer"></div>
      {this.props.video &&
        <button className="videoCloseButton" onClick={this.close}>&times;</button>}
    </div>;
  }
}

export default VideoPlayer;
