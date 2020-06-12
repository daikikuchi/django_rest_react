import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
// Call getLeads when component mounts and the leads come down from the reducer into the componet as a state

export class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    return (
      <>
         <h2>Leads</h2>
         <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th />
            </tr>
          </thead>
          <tbody>
            { this.props.leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>
                 <button onClick=
                 {this.props.deleteLead.bind(this, lead.id)}
                 className="btn btn-danger btn">
                 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
         </table>
      </>
    );
  }
}

const mapStateToProps = state => ({
    leads: state.leads.leads
});

// whenever we use connect we need to export default connect
export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
