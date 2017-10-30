import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const ExportControls = ({ toLocal, toCOnline }) => (
  <div className="mb-0">
    <input
      type="file"
      accept=".json"
      className="btn btn-primary btn-sm"
      onChange={toLocal}
    />
    <Button
      size="sm"
      color="primary"
      className="float-right"
      onClick={toCOnline}
    >load online
    </Button>
  </div>
);

export default ExportControls;

ExportControls.propTypes = {
  toLocal: PropTypes.func.isRequired,
  toCOnline: PropTypes.func.isRequired,
};

