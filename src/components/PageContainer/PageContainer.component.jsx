import React, { Fragment } from 'react';

import SideBar from '../SideBar/SideBar.component';
import RightSideBar from '../RightSideBar/RightSideBar.component';

import './PageContainer.styles.scss'

const PageContainer = ({ component: Component }) => {
  return class DefaultPageContainer extends React.Component {
    render() {
      return (
        <Fragment>
          <div className='page'>
            <SideBar />
            <div id='content'>
              <div id='content-inner'>
                <Component {...this.props} />
              </div>
            </div>
            <RightSideBar />
          </div>
        </Fragment>
      );
    }
  };
};

export default PageContainer;
