import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../redux/posts/posts.actions';
import handleSorting from '../../services/handleSorting';

import LinkButton from '../../components/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';

import './QuestionsPage.styles.scss';

const QuestionsPage = ({getPosts, post: {posts, loading}}) => {
  let searchQuery = new URLSearchParams(useLocation().search).get('search');

  useEffect(() => {
    getPosts(searchQuery);
  }, [getPosts, searchQuery]);

  const [sortType, setSortType] = useState('Newest');
 
  posts = posts?.filter((post) =>{
                let arrs = [];
                if(searchQuery){
                  arrs = searchQuery.split(' ')
                }
                for(let arr of arrs ){
                  if(post?.title.toLowerCase().includes(arr) || post?.tagname.includes(arr.toLowerCase())){
                      return true;
                  }
                }
                return post?.title.toLowerCase().includes(searchQuery ? searchQuery : '');
            }
    )


  return loading || posts === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      {searchQuery ? (
        <PageTitle
          title={`Search Results for ${searchQuery}`}
        />
      ) : (
        ''
      )}
      <div className='questions-page fc-black-800 main-bar'>
        <div className='questions-grid'>
          <h3 className='questions-headline'>
            {searchQuery ? 'Search Results' : 'All Questions'}
          </h3>
          <div className='questions-btn'>
            <LinkButton
              text={'Ask Question'}
              link={'/add/question'}
              type={'s-btn__primary'}
            />
          </div>
        </div>
        {searchQuery ? (
          <div className='search-questions'>
            <span className='fc-light' style={{fontSize: 15}}>
              Results for <span className='fc-black-900'>{searchQuery}</span> 
            </span>
            <SearchBox placeholder={'Search...'} name={'search'} pt={'mt8'} />
          </div>
        ) : (
          ''
        )}
        <div className='questions-tabs'>
          <span>
            {
            posts?.length
            } Results
          </span>
          <ButtonGroup
            buttons={['Newest', 'Votes', 'Views', 'Oldest']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='questions'>
          {
            posts?.sort(handleSorting(sortType))
            .map((post) => (
              <PostItem key={post?.id} post={post} />
            ))
            }
            
        </div>
      </div>
    </Fragment>
  );
};

QuestionsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPosts})(QuestionsPage);
