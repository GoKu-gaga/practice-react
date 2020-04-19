import {
  CHANGE_RANK_LIST,
  CHANGE_LOADING
} from './constants'
import {
  fromJS
} from 'immutable' // 将 JS 对象转换成 immutable 对象
import {
  getRankListRequest
} from '../../../api/request'

const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data)
})

export const getRankList = () => {
  return dispatch => {
    getRankListRequest().then(data => {
      let list = data && data.list
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data
})
