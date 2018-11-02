import React, { Component } from 'react';
import './VideoPlayer.css';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlaying: 0
    };
  }
  playVideo = videoIndex => {
    this.videoPlayer = document.createElement('video');
    this.videoPlayer.src = this.props.videos[videoIndex];
    this.videoPlayer.controls = true;
    this.videoPlayer.addEventListener('ended', this.onVideoEnded, false);
    this.videoPlayer.play();

    this.refs.videoContainer.innerHTML = '';
    this.refs.videoContainer.appendChild(this.videoPlayer);
  };

  onVideoEnded = event => {
    const nextIndex = this.state.currentPlaying + 1;
    if (nextIndex + 1 > this.props.videos.length) {
      return;
    }

    this.setState({
      currentPlaying: nextIndex
    });

    this.playVideo(nextIndex);
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.videos) {
      this.refs.videoContainer.innerHTML = '';
      return;
    }
    if (nextProps.videos.join('') !== this.props.videos.join('')) {
      this.playFromStart();
    }
  }

  componentDidMount() {
    this.playFromStart();
  }

  playFromStart = () => {
    this.setState({
      currentPlaying: 0
    });

    this.playVideo(this.state.currentPlaying);
  };

  playPrev = () => {
    const nextIndex = this.state.currentPlaying - 1;
    if (nextIndex < 0) return;

    this.setState({
      currentPlaying: nextIndex
    });

    this.playVideo(nextIndex);
  };

  playNext = () => {
    const nextIndex = this.state.currentPlaying + 1;
    if (nextIndex + 1 > this.props.videos.length) return;

    this.setState({
      currentPlaying: nextIndex
    });

    this.playVideo(nextIndex);
  };

  render() {
    return (
      <div className="video-play-section">
        {this.props.videos.length > 1 && (
          <div className="playing-progress" style={{ textAlign: 'center' }}>
            {this.state.currentPlaying + 1}/{this.props.videos.length}
          </div>
        )}
        <div ref="videoContainer" className="videoContainer" />
        {this.props.videos.length > 1 && (
          <div className="player-buttons">
            <button
              disabled={this.state.currentPlaying === 0}
              onClick={this.playPrev}
              className="prev-button"
            >
              prev
            </button>
            <button
              disabled={this.state.currentPlaying === this.props.videos.length - 1}
              onClick={this.playNext}
              className="next-button"
            >
              next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default VideoPlayer;
