import jsonplaceholder from '../Apis/jsonPlacholder'
import _ from 'lodash'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
   await dispatch(fetchPosts())
   console.log(getState().posts);

//   const userIds = _.uniq(_.map(getState().posts, 'userId'))
//   userIds.forEach(id => dispatch(fetchUser(id)))

    _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();

}

export const fetchPosts =  () => async dispatch => {
    const response =  await jsonplaceholder.get('/posts')

      dispatch({ type: 'FETCH_POSTS', payload: response.data})
    }

export const fetchUser = (id) => async dispatch => {
        const response = await jsonplaceholder.get(`/users/${id}`)

        dispatch({ type: 'FETCH_USER', payload: response.data})
    }


    // MEMOIZED VERSION
    // export const fetchUser = (id) => dispatch => {
    //     _fetchUser(id, dispatch);
    //   }
    //       const _fetchUser = _.memoize( async (id, dispatch) => {
    //           const response = await jsonplaceholder.get(`/users/${id}`)
      
    //           dispatch({ type: 'FETCH_USER', payload: response.data})
    //       })