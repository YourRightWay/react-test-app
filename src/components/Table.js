import React, {Component} from 'react';
import TableData from './TableData';


class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      item: '',
    }
  }

  handleEdit = (id) => {
    this.setState({edit: id})
  };

  handleCancel = () => {
    this.setState({edit: false})
  };

  render() {
    const { data } = this.props;
    const dataNames =  Object.keys(data[0]);
    return (
      <table className="table table-hover">
        <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          {dataNames.map((item, ind) =>  <th key={ind} scope="col">{item}</th>)}
          <th scope="row">Actions</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item, ind) => (
          <TableData
            key={ind}
            item={item}
            ind={ind}
            edit={this.handleEdit}
            isEdit={this.state.edit === ind}
            cancel={this.handleCancel}
            {...this.props}
          />
        ))}
        </tbody>
      </table>
    )
  }
}

export default Table;

