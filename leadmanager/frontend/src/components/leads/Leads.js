import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads } from '../../actions/leads';
// Call getLeads when component mounts and the leads come down from the reducer into the componet as a state

export class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <h1>Leads list</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    leads: state.leads.leads
});

// whenever we use connect we need to export default connect
export default connect(mapStateToProps)(Leads);
