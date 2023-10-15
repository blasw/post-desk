import { clear } from '../store/slices/postsSlice'
import { useAppDispatch } from './reduxHooks'

function useClearifyPosts() {
  const useDispatch = useAppDispatch()

  useDispatch(clear)
}

export default useClearifyPosts
