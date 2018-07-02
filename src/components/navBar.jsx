'use strict';
require('./navBar.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';

import subNav from '../assets/png/subnav.png';
import burgerMenu from '../assets/png/burger-menu.png';
import home from '../assets/png/home.png';


const cx = classPrefixer('navbar');

const MORE_SPACE = 60;

export default class NavBar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            initial: true,
            topItems: [],
            moreItems: []
        };

        this.dataElWidths = [];
    }

    componentDidMount() {
        if (this.hiddenRef && this.props.data.length) {          
            [].slice.call(this.hiddenRef.children).forEach(el => {
                this.dataElWidths.push(el.clientWidth);
            });
            window.addEventListener('resize', this.updateMenu);
            this.updateMenu();
        }
    }

    updateMenu = () => {
        if (this.wrapperRef && this.dataElWidths.length) {
            const wrapper = this.wrapperRef.getBoundingClientRect();
            const maxWidth = wrapper.width;
            let currWidth = 0,
                top = [],
                more = [];
            
            this.props.data.forEach((el, idx) => {
                if ((currWidth + this.dataElWidths[idx] + MORE_SPACE) <= maxWidth) {
                    currWidth += this.dataElWidths[idx];
                    top.push(el);
                } else {
                    more.push(el);
                }
            });

            this.setState({
                initial: false,
                topItems: top,
                moreItems: more
            });
        }
    };

    setWrapperRef = (ref) => {
        this.wrapperRef = ref;
    };

    setHiddenRef = (ref) => {
        this.hiddenRef = ref;
    };

    render() {
        const { initial, topItems, moreItems } = this.state;
        const { data } = this.props;

        /* eslint-disable */
        return (
            <div ref={this.setWrapperRef} className={cx('wrapper')}>
                <If condition={initial}>
                    <div ref={this.setHiddenRef} className={cx('hidden-wrapper')}>
                        {
                            data.map((el, idx) => {
                                return (
                                    <div key={`hidd_el_${idx}`} className={cx('hidden-el')}>
                                        <a href={el.link} >{el.title}</a>
                                    </div>
                                );
                            })
                        }
                    </div>
                <Else />
                <label htmlFor="show-menu" className={cx('show-menu')}>
                    <img className={cx('burger')} src={burgerMenu} />
                </label>
                <input type="checkbox" id="show-menu" role="button" />

                <a className={cx('home')} id="home" href="#">
                    <img src={home} />
                </a>

                <ul className={cx('menu')} id="menu">
                    {
                        topItems.map((ti, idx) => {
                            return (
                                <li><a href={ti.link}>{ti.title}</a></li>
                            );
                        })
                    }
                    <If condition={moreItems.length}>
                        <li className={cx('more')}>
                            <a className={cx('more-btn')} href="#">
                                {'Več'}
                                <img className={cx('subnav')} src={subNav} />
                            </a>
                            <ul className={cx('hidden')}>
                                {
                                    moreItems.map((mi, idx) => {
                                        return (
                                            <li><a href={mi.link}><img className={cx('subnav')} src={subNav} />{mi.title}</a></li>
                                        );
                                    })   
                                }
                            </ul>
                        </li>
                    </If>
                </ul>
                </If>
            </div>
        );
        /* eslint-enable */
    }

}

const { array } = PropTypes;
NavBar.propTypes = {
    data: array
};
