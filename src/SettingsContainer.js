import { connect } from 'react-redux';
import { changeConfig } from './actions/settings-actions';
import Settings from './Settings';

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeConfig: (config) => {
        dispatch(changeConfig(config));
    },
});

const SettingsContainer = connect(
    undefined,
    mapDispatchToProps,
)(Settings);
export default SettingsContainer;
