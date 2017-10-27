import React, {Component} from 'react';


class TableData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    }
  }

  handleChange = ({target}) => {
    this.setState({item: Object.assign({}, this.state.item, {[target.name]: target.value})});
  };

  handleSave = () => {
    this.props.save(this.state.item, this.props.ind);
    this.props.cancel();
  };

  renderRowData = (item, ind) => (
    <tr>
      <th scope="row">{ind + 1}</th>
      {Object.keys(item).map((name, ind) => <td key={ind}>{item[name]}</td>)}
      <td>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={e => this.props.edit(ind)}>Edit
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={e => this.props.delete(ind)}
        >Delete
        </button>
      </td>
    </tr>
  );

  renderEditControls = (item, ind) => (
    <tr>
      <th scope="col">{ind + 1}</th>
      {Object.keys(item).map((name, ind) => (
        <th key={ind} scope="col">
          <input
            id={name}
            className="form-control form-control-sm"
            type="text"
            name={name}
            value={this.state.item[name]}
            onChange={this.handleChange}
          />
        </th>
      ))}
      <th scope="col">
        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSave}>save</button>
        <button type="button" className="btn btn-danger btn-sm" onClick={this.props.cancel}>cancel</button>
      </th>
    </tr>
  );

  render() {
    const {ind, item, isEdit} = this.props;
    return isEdit ? this.renderEditControls(item, ind) : this.renderRowData(item, ind);
  }
}

export default TableData;
