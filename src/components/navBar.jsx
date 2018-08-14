'use strict';
require('./navBar.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';

import subNav from '../assets/png/subnav.png';

const cx = classPrefixer('navbar');

const MORE_SPACE = 70;
const menuArray = [
    {
        title: 'N',
        link: 'http://novice.najdi.si'
    },
    {
        title: 'Vroče zgodbe',
        link: '/kategorija/vroce-zgodbe'
    },
    {
        title: 'Slovenija',
        link: '/kategorija/slovenija'
    },
    {
        title: 'Regionalne novice',
        link: '/kategorija/regionalne-novice'
    },
    {
        title: 'Svet',
        link: '/kategorija/svet'
    },
    {
        title: 'Gospodarstvo',
        link: '/kategorija/gospodarstvo'
    },
    {
        title: 'Šport',
        link: '/kategorija/sport'
    },
    {
        title: 'Kronika',
        link: '/kategorija/kronika'
    },
    {
        title: 'Zanimivosti',
        link: '/kategorija/zanimivosti'
    },
    {
        title: 'Avtomobilizem',
        link: '/kategorija/avtomobilizem'
    },
    {
        title: 'Znanost in IT',
        link: '/kategorija/znanost-in-it'
    },
    {
        title: 'Kultura',
        link: '/kategorija/kultura'
    },
    {
        title: 'Lepota in zdravje',
        link: '/kategorija/lepota-in-zdravje'
    },
    {
        title: 'Vreme',
        link: 'http://vreme.alpha.najdi.si'
    },
    {
        title: 'Seznam virov',
        link: 'http://novice.alpha.najdi.si/seznamvirov'
    }
];

export default class NavBar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            initial: true,
            topItems: [],
            moreItems: []
        };

        this.data = props.data && props.data.length ? props.data : menuArray;
        this.dataElWidths = [];
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.measureComponents();
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    measureComponents = () => {
        if (this.hiddenRef && this.data.length) {
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

            this.data.forEach((el, idx) => {
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

        /* eslint-disable */
        return (
            <div ref={this.setWrapperRef} className={cx('wrapper')}>
                <If condition={initial}>
                    <div ref={this.setHiddenRef} className={cx('hidden-wrapper')}>
                        {
                            this.data && this.data.map((el, idx) => {
                                return (
                                    <div key={`hidd_el_${idx}`} className={cx('hidden-el')}>
                                        <a href={el.link} >{el.title}</a>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <Else />
                    <ul className={cx('menu')} id="menu">
                        {
                            topItems && topItems.map((ti, idx) => {
                                return (
                                    <li key={`top_${idx}`}><a href={ti.link}>{ti.title}</a></li>
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
                                                <li key={`more_${idx}`}><a href={mi.link}>{mi.title}</a></li>
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
