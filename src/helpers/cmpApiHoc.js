import React from 'react';
import PropTypes, { object } from 'prop-types';
import dummyImg from '../assets/png/dummy300x150.png';
import mock from '../components/mock.json';
const fetch = require('isomorphic-fetch');

export function cmpApiHoc(cmpSetup) {
    return function(Component) {
        class CmpApiHoc extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    apiResult: null,
                    data: null,
                    parsed: false
                };
            }

            componentDidMount() {
                if (!this.props.jsonData) {
                    this._isMounted = true;
                    this.fetchData(this.props.apiUrl);
                } else if (this.props.jsonData) {
                    const parsedData = this.parseRaw(this.props.jsonData);
                    this.setState({ // eslint-disable-line
                        parsed: true,
                        data: parsedData
                    });
                }
            }

            componentWillReceiveProps(np, ns) {
                if (this.state.apiResult !== ns.apiResult) {
                    this.parseData(ns.apiResult);
                }
            }

            componentDidUpdate() {
                if (!this.state.parsed && this.state.apiResult) {
                    const parsedData = this.parseData(this.state.apiResult);
                    this.setState({ // eslint-disable-line
                        parsed: true,
                        data: parsedData
                    });
                }
            }

            componentWillUnmount() {
                this._isMounted = false;
            }

            // In case of bad data, we don't wanna render anything
            fetchData = url => {
                if (cmpSetup && cmpSetup.mock) {
                    this.setState({
                        apiResult: mock
                    });
                } else {
                    if (!url) return;

                    let response, parsedData;
                    fetch(url, {credentials: 'include'})
                        .then(result => {
                            response = result.clone();
                            return result.text();
                        })
                        .then(data => {
                            try {
                                parsedData = JSON.parse(data);
                            } catch (e) {
                                return;
                            }

                            if (!this._isMounted) return;

                            if (response.status >= 400 && response.status <= 599) {
                                return;
                            }

                            this.setState({
                                apiResult: parsedData
                            });

                        })
                        .catch(error => {
                            return;
                        });
                }
            };

            parseData = data => {
                let artNum = 0;
                if (typeof cmpSetup === 'object' && cmpSetup.articles) {
                    artNum = cmpSetup.articles;
                }

                if (!artNum || !data.results || !data.results.document || !data.results.document.length) {
                    return null;
                }

                data.results.document.filter(function(el) {
                    if (!el.image) {
                        el.image = dummyImg;
                    }
                    return el;
                });

                if (cmpSetup.noArray) {
                    return data.results.document[0];
                } else {
                    return data.results.document.slice(0, artNum);
                }
            }

            parseRaw = data => {
                let el = data;
                if (!el.image) {
                    el.image = dummyImg;
                }
                return el;
            }

            render() {
                const { data } = this.state;

                if (data) {
                    return <Component {...this.props} data={data} />;
                } else {
                    return null;
                }
            }
        }

        const { string } = PropTypes;
        CmpApiHoc.propTypes = {
            apiUrl: string,
            jsonData: object
        };

        return CmpApiHoc;
    };
}
