import React from "react";
import CardsComponent from "../CardComponents/CardsComponent";

const ClassesComponent = () => {
  function openCard() {
    console.log("opened");
  }
  return (
    <div>
      <CardsComponent openCard={openCard}></CardsComponent>
    </div>
  );
};

export default ClassesComponent;
