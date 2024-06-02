import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../config/configureStore'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
