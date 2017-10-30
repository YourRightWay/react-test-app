import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import TableData from './TableData';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      theadItems: ['Candidate name', 'Candidate status', 'Candidate need offer', 'Actions']
    };
  }

  handleEdit = (id) => {
    this.setState({ edit: id });
  };

  handleCancel = () => {
    this.setState({ edit: false });
  };

  // renderTableNames = data => (
  //   data.map(item => <th key={nanoid()} scope="col">{item.name}</th>)
  // );

  renderTableNames() {
    return this.state.theadItems.map(data => <th key={nanoid()} scope="col">{data}</th>);
  }

  render() {
    const { data } = this.props;

    /**
     * Зачем это здесь нужно? Можно ведь статикой хранить thead таблицы?
     * Зачем жестко привязываться к data[0]?
     * В крайнем случае можно в конструкторе хранить названия колонок таблицы.
     * И в ты эти все действия мог бы вынести в метод класа,
     * обратится от туда к нужным пропсам и вернуть из метода уже сгенерированый thead.
     * Тем более у тебя уже там значения статикой некоторые прописаны
     */

    // Это кусок наверно лучше убрать от сюда
    const dataNames = [];
    Object.keys(data[0]).map(key => (dataNames.push({ name: key, id: nanoid() })));

    return (
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            {/*  {this.renderTableNames(dataNames)} */}
            {this.renderTableNames()}
            <th scope="row">Actions</th>
          </tr>
        </thead>
        <tbody>
        {/* Тоже я бы сделал отдельным методом. Не очень читаемо получается */}
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

