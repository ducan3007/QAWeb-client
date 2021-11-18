import React, {Fragment} from 'react';

import './VoteCell.styles.scss';

const VoteCell = ({answerCount,commentCount}) => {
  


  return (
    <Fragment>
      <div className='vote-cell fc-black-1000'>
        <div className='stats'>
          <div className='vote'>
            <span className='vote-count'>{answerCount}</span>
            <div className=''>Answers</div>
          </div>
          <div className='vote'>
            <span className='vote-count'>{commentCount}</span>
            <div className='count-text'>Comments</div>
          </div>
          <div className='vote'>
            <span className='vote-count'>1</span>
            <div className='count-text'>Tags</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VoteCell;
