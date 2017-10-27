import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editData, deleteData, getDataOnline, getDataLocal } from '../actions';
import Table from '../components/Table';
import {saveAs} from 'file-saver';


class Main extends Component {

  handleLoadDataOnline = () => {
    this.props.actions.getDataOnline();
  };

  handleLoadDataLocal = ({target}) => {
    if (target.files[0]) {
      const reader = new FileReader();
      reader.readAsText(target.files[0], "UTF-8");

      reader.onload = e => {
        this.props.actions.getDataLocal(JSON.parse(e.target.result));
      };

      reader.onerror = (evt) => console.error("Error reading file");
    }
  };


  handleSaveData = (data, ind) => {
    this.props.actions.editData({data, ind});
  };

  handleDeleteData = (ind) => {
    this.props.actions.deleteData(ind);
  };

  handleExportToJSON = () => {
    const fileName = 'data.json';
    const fileToSave = new Blob([JSON.stringify(this.props.data)], {
      type: 'application/json',
      name: fileName
    });

    saveAs(fileToSave, fileName);
  };

  handleExprortToCSV = () => {
    const items = this.props.data;
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(items[0]);

    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));

    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    const fileName = 'data.csv';
    const fileToSave = new Blob([csv], {
      type: 'text/csv',
      name: fileName
    });

    saveAs(fileToSave, fileName);
  };

  render() {
    const {data} = this.props;
    return data[0] ? (
      <div className="container mt-5">
        <Table
          data={data}
          save={this.handleSaveData}
          delete={this.handleDeleteData}
        />
        <div className="col-md-12">
          <button type="button" className="btn btn-primary btn-sm" onClick={this.handleExportToJSON}>export as json</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={this.handleExprortToCSV}>export as csv</button>
        </div>
      </div>
    ) : (
      <div className="container mt-5">
        <div className="alert alert-primary" role="alert">
          <h4 className="alert-heading">Welcome!</h4>
          <p>Please select an existing file or download the database online</p>
          <hr />
            <p className="mb-0">
              <input
                type="file"
                accept=".json"
                className="btn btn-primary btn-sm"
                onChange={this.handleLoadDataLocal}/>
              <button
                type="button"
                className="btn btn-primary btn-sm float-right"
                onClick={this.handleLoadDataOnline}>load online</button>
            </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editData,
      deleteData,
      getDataOnline,
      getDataLocal
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
