import { CONSTANTS } from "../action";

let listID = 3;
let cardID = 8;

const initialState = [
  {
    title: "Open",
    id: `list-${0}`,
    cards: [],
  },
  {
    title: "Work In Progress",
    id: `list-${1}`,
    cards: [],
  },
  {
    title: "Completed",
    id: `list-${2}`,
    cards: [],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {

    case CONSTANTS.ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: cardID,
      };
      cardID += 1;

      console.log("action received", action);

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return newState;

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
      } = action.payload;

      const NewState = [...state];
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find((list) => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return NewState;

    default:
      return state;
  }
};

export default listsReducer;
