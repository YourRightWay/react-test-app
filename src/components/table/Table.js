import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import TableData from './TableData';


class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    };
  }

  handleEdit = (id) => {
    this.setState({ edit: id });
  };

  handleCancel = () => {
    this.setState({ edit: false });
  };

  renderTableNames = data => (
    data.map(item => <th key={nanoid()} scope="col">{item.name}</th>)
  );

  render() {
    const { data } = this.props;
    const dataNames = [];

    Object.keys(data[0]).map(key => (dataNames.push({ name: key, id: nanoid() })));

    return (
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            {this.renderTableNames(dataNames)}
            <th scope="row">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, ind) => (
            <TableData
              key={nanoid()}
              item={item}
              ind={ind}
              edit={this.handleEdit}
              isEdit={this.state.edit === ind}
              cancel={this.handleCancel}
              dataNames={dataNames}
              {...this.props}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

