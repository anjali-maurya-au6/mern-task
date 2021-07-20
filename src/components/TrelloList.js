import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListsContainer = styled.div`
  background-color: #c5c0c4;
  border-radius: 3px;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin-right: 15px;
`;
const TrelloList = ({ title, cards, listID }) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <ListsContainer {...provided.droppableProps} ref={provided.innerRef}>
          <h2>{title}</h2>
          {cards.map((card, index) => (
            <TrelloCard
              key={card.id}
              index={index}
              text={card.text}
              id={card.id}
            />
          ))}
          <TrelloActionButton listID={listID} />
          {provided.placeholder}
        </ListsContainer>
      )}
    </Droppable>
  );
};

export default TrelloList;
