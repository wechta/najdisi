'use strict';
require('./imgVideo.scss');

import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import classPrefixer from '../helpers/classPrefixer';

import playBtn from '../assets/png/play.png';
import pauseBtn from '../assets/png/pause.png';

const cx = classPrefixer('image-video');

export default class ImageVideo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            playing: false
        };
    }

    onPlay = (ev) => {
        ev.preventDefault();
        if (ev.type === 'touchend') {
            return;
        } else {
            this.setState({ playing: true });
        }
    }

    onPause = (ev) => {
        ev.preventDefault();
        if (ev.type === 'touchend') {
            return;
        } else {
            this.setState({ playing: false });
        }
    }

    render() {
        const { image, video, imgLink } = this.props;
        const playing = this.state.playing;

        return (
            <div className={cx('wrapper')}>
                <Choose>
                    <When condition={video}> 
                        <div className={cx('player-wrapper')}>
                            <ReactPlayer
                                className={cx('react-player')}
                                url={video}
                                width="100%"
                                height="100%"
                                playing={playing}
                            />
                            <div className={cx('button', playing && 'hide')} onClick={this.onPlay} onTouchEnd={this.onPlay}>
                                <img className={cx('btn-icon')} src={playBtn} />
                            </div>
                            <div className={cx('button', !playing && 'hide')} onClick={this.onPause} onTouchEnd={this.onPause}>
                                <img className={cx('btn-icon')} src={pauseBtn} />
                            </div>
                        </div>
                    </When>
                    <Otherwise>
                    <a href={imgLink} target="_blank">
                        <div className={cx('img-wrap')} style={{ backgroundImage: `url(${image})` }} />
                    </a>
                    </Otherwise>
                </Choose> 
            </div>
        );
    }
}

const { string, bool } = PropTypes;
ImageVideo.propTypes = {
    image: string,
    video: string,
    imgLink: string,
    forceImg: bool
};
