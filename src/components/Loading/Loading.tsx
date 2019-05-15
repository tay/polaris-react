import * as React from 'react';
import compose from '@shopify/react-compose';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import {FrameContextType, FrameContext} from '../Frame';
import withContext from '../WithContext';
import {WithContextTypes} from '../../types';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

export interface Props {}
export type ComposedProps = Props &
  WithAppProviderProps &
  WithContextTypes<FrameContextType>;

export class Loading extends React.PureComponent<ComposedProps, never> {
  private appBridgeLoading: AppBridgeLoading.Loading | undefined;

  componentDidMount() {
    const {
      polaris: {appBridge},
      context,
    } = this.props;

    if (appBridge == null) {
      context.startLoading();
    } else {
      this.appBridgeLoading = AppBridgeLoading.create(appBridge);
      this.appBridgeLoading.dispatch(AppBridgeLoading.Action.START);
    }
  }

  componentWillUnmount() {
    const {
      polaris: {appBridge},
      context,
    } = this.props;

    if (appBridge == null) {
      context.stopLoading();
    } else if (this.appBridgeLoading != null) {
      this.appBridgeLoading.dispatch(AppBridgeLoading.Action.STOP);
    }
  }

  render() {
    return null;
  }
}

export default compose<Props>(
  withContext<Props, WithAppProviderProps, FrameContextType>(
    FrameContext.Consumer,
  ),
  withAppProvider(),
)(Loading);
