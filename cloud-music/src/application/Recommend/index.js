import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'

import * as actionTypes from './store/actionCreators'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scroll'
import { Content } from './style'
import Loading from '../../baseUI/loading'
import { renderRoutes } from 'react-router-config'

function Recommend (props) {

  const { bannerList, recommendList, enterLoading, songsCount } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    if (!bannerList.size){
      getBannerDataDispatch ()
    }
    if (!recommendList.size){
      getRecommendListDataDispatch ()
    }
    //eslint-disable-next-line
  }, [])

  //mock 数据
  const bannerListJS = bannerList ? bannerList.toJS(): []

  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
      { renderRoutes(props.route.routes) }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend))
