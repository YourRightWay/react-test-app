import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Jumbotron  } from 'reactstrap';
import * as dataActions from '../../actions/dataActions';
import Table from '../../components/table/Table';
import ExportControls from '../../components/controls/ExportControls';
import ImportControls from '../../components/controls/ImputControls';
import WelcomeMessage from '../../components/welcomeMessage/WelcomeMessage';
import { exportToJSON, exportToCSV } from '../../utils/fileHelpers';

/**
 * Обрати внимание там где линтер ругается.
 * Так как если игнорировать его ошибки - то и смысла большого от него нету.
 * У меня шторм сразу подсвечивает в какой строке ошибка. Рекомендую настроить.
 */
class Main extends Component {
  // handleLoadDataOnline = () => {
  //   this.props.getDataOnline();
  // };

  // handleLoadDataLocal = ({target}) => {
  //   this.props.getDataLocal(target);
  // };

  // handleSaveData = (data, ind) => {
  //   this.props.editData({data, ind});
  // };

  // handleDeleteData = (ind) => {
  //   this.props.deleteData(ind);
  // };

  // handleExportToJSON = () => {
  //   exportToJSON('data', this.props.items);
  // };
  //
  // handleExportToCSV = () => {
  //   exportToCSV('data', this.props.items);
  // };

  /**
   * Можно переписать в stateless компонент
   * @returns {XML}
   */

  render() {
    const { items, deleteData, editData, getDataOnline, getDataLocal } = this.props;

    return items.length ? (
      <Container>
        <Table
          data={items}
          save={(data, ind) => editData({ data, ind })}
          delete={ind => deleteData(ind)}
        />
        <ExportControls
          toJSON={() => exportToJSON('data', items)}
          toCSV={() => exportToCSV('data', items)}
        />
      </Container>
    ) : (
      <Container>
        <Jumbotron>
          <WelcomeMessage />
          <ImportControls
            toLocal={target => getDataLocal(target)}
            toCOnline={() => getDataOnline()}
          />
        </Jumbotron>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    ...state.data,
  };
}

/**
 * @type {{editData: editData, deleteData: deleteData, getDataOnline: getDataOnline, getDataLocal: getDataLocal}}
 */
const mapDispatchToProps = {
  ...dataActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  getDataOnline: PropTypes.func.isRequired,
  getDataLocal: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
};
