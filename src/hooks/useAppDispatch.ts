import { useDispatch } from 'react-redux'
import { AppDispatch } from '../config/configureStore'

export const useAppDispatch = () => useDispatch<AppDispatch>()