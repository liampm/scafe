import React from 'react';

export default class Search extends React.Component {
    state = {
        showSearchBox: false
    };

    render() {
        return (
            <li>
                <input type="search" className={this.state.showSearchBox ? 'navSearch' : 'navSearch hide'} onBlur={this.toggleSearchBox.bind(this)}/>
                <a href="#search" className={this.state.showSearchBox ? 'navSearch hide' : 'navSearch'} onClick={this.toggleSearchBox.bind(this)}>
                    <i className="material-icons">search</i>
                </a>
            </li>
        );
    }

    componentWillMount() {
        this.setState((state, props) => ({
            showSearchBox: props.showSearchBox
        }));
    }

    toggleSearchBox() {
        this.setState((state) => ({
            showSearchBox: !state.showSearchBox
        }));
    }
}
