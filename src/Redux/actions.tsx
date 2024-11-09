export const ADD_COORDINATE = 'ADD_COORDINATE'
export const DELETE_COORDINATE = 'DELETE_COORDINATE'

export interface Coordinate {
  latitude: number
  longitude: number
}

export const addCoordinate = (coordinate: Coordinate) => ({
  type: ADD_COORDINATE,
  payload: coordinate,
})

export const deleteCoordinate = (index: number) => ({
  type: DELETE_COORDINATE,
  payload: index,
})