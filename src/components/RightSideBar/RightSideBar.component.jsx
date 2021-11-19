import React, {Fragment} from 'react';

import TagsWidget from './TagsWidget/TagsWidget.component';

import './RightSideBar.styles.scss';

const RightSideBar = () => {
  return (
    <Fragment>
      <div className='side-bar'>
        <TagsWidget />
      </div>
    </Fragment>
  );
};

export default RightSideBar;
