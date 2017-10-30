import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const ExportControls = ({toJSON, toCSV}) => (
  <div className="col-md-12">
    <Button
      color="primary"
      onClick={toJSON}
    >
      Export as json
    </Button>

    <Button
      color="primary"
      onClick={toCSV}
    >
      Export as csv
    </Button>
  </div>
);

export default ExportControls;

ExportControls.propTypes = {
  toJSON: PropTypes.func.isRequired,
  toCSV: PropTypes.func.isRequired,
};

