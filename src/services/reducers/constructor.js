import itemImage from '../../images/item.png';
import { 
  UPDATE_TOTAL_PRICE,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  OPEN_POPUP_ORDER,
  DELETE_ORDER_NUMBER,
  CLOSE_POPUP_ORDER,
} from '../actions/constructor';

const initialState = {
  bun: {
    text: 'ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ',
    price: 20,
    image: itemImage, 
    _id: "60d3b41abdacab0026a733c6"
  },
  order: 'number',
  popupVisible: false,
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
  totalPrice: 0,
  order: 0,
  ingredients: [
    {
          "_id": "60d3b41abdacab0026a733c9",
          "name": "Мясо бессмертных моллюсков Protostomia",
          "type": "main",
          "proteins": 433,
          "fat": 244,
          "carbohydrates": 33,
          "calories": 420,
          "price": 1337,
          "image": "https://code.s3.yandex.net/react/code/meat-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
          "__v": 0
      },
  ],
}

export const constructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice
      }
    }
    case GET_ORDER_DETAILS: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        order: action.order
      }
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        order: 0
      }
    }
    case OPEN_POPUP_ORDER: {
      return {
        ...state,
        popupVisible: true
      }
    }
    case CLOSE_POPUP_ORDER: {
      return {
        ...state,
        popupVisible: false
      }
    }
    default: {
      return state
    }
  }
}