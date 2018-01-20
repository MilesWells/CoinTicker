import React from 'react';
import { connect } from 'react-redux';
import { fetchDataAsyncDispatcher } from './myConnectedComponent.reducer';

class MyConnectedComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            myState: 'Hello World!'
        };
    }

    async componentDidMount() {
        await this.props.fetchDataAsyncDispatcher();
    }

    render() {
        return (
            <div>
                <div>{this.state.myState}</div>
                {this.props.myData && (
                    <div>{this.props.myData.hello}</div>
                )}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        myData: state.myComponent.data
    }),
    {
        fetchDataAsyncDispatcher
    }
)(MyConnectedComponent);