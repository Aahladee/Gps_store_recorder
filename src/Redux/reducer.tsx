import { ADD_COORDINATE, DELETE_COORDINATE, Coordinate } from './actions'

interface State {
  coordinates: Coordinate[]
}

const initialState: State = {
  coordinates: [],
}

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_COORDINATE:
      return {
        ...state,
        coordinates: [...state.coordinates, action.payload],
      }
    case DELETE_COORDINATE:
      const newCoordinates = [...state.coordinates]
      newCoordinates.splice(action.payload, 1)
      return {
        ...state,
        coordinates: newCoordinates,
      }
    default:
      return state
  }
}

export default rootReducer