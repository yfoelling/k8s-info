import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const mapStateToProps = (state, { match }) => ({
  pods: state.pods,
  currentContext: match.params.context,
  currentNamespace: match.params.namespace,
  currentPod: match.params.pod,
});

const PodDropdown = ({ classes, currentContext, currentNamespace, currentPod, pods }) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="pod-dropdown">Pod</InputLabel>
      <Select
        value={currentPod}
        inputProps={{
          name: 'pod',
          id: 'pod-dropdown',
        }}
      >
        {pods.items.filter(pod => pod.metadata.namespace === currentNamespace).map(pod => {
          const podName = pod.metadata.name;

          return (
            <MenuItem component={Link} to={'/' + currentContext + '/' + currentNamespace + '/' + podName} value={podName} key={podName}>
              {podName}
            </MenuItem>
          );
        })}
        {pods.loading && <MenuItem value={currentPod}>{currentPod}</MenuItem>}
        {pods.loading && <MenuItem><CircularProgress /></MenuItem>}
        {pods.error && <MenuItem>Error!</MenuItem>}
      </Select>
    </FormControl>
  );
};

PodDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  currentContext: PropTypes.string.isRequired,
  currentNamespace: PropTypes.string.isRequired,
  currentPod: PropTypes.string.isRequired,
  pods: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    items: PropTypes.array.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PodDropdown)));
