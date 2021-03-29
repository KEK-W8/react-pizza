import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "./Button.jsx";

function PizzaBlock({
  id,
  name,
  imageUrl,
  price,
  types,
  sizes,
  onClickAddPizza,
}) {
  const availableTypes = ["традиционное", "тонкое"];
  const availableSizes = [26, 30, 40];

  const [displayedImage, setDisplayedImage] = useState(imageUrl[0]);
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  useEffect(() => {
    switch (selectedType) {
      case types[1]:
        setDisplayedImage(imageUrl[1]);
        break;
      default:
        setDisplayedImage(imageUrl[0]);
    }
  }, [selectedType, types, imageUrl]);

  function handleSelectType(index) {
    setSelectedType(index);
  }
  function handleSelectSize(num) {
    setSelectedSize(num);
    if (num === 26) {
      setSelectedSize(num);
      setSelectedType(types[0]);
    }
  }
  function handleAddPizza() {
    const obj = {
      id,
      name,
      price,
      imageUrl: imageUrl[displayedImage],
      size: selectedSize,
      type: availableTypes[selectedType],
    };
    onClickAddPizza(obj);
    window.alert(`Добавлено: ${obj.name} ${obj.size}см.`);
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={displayedImage} alt="pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {availableTypes.map((availType, index) => (
            <li
              key={availType}
              onClick={() => handleSelectType(index)}
              className={classNames({
                active: selectedType === index,
                disabled: index === 1 && selectedSize === 26,
              })}
            >
              {availType}
            </li>
          ))}
        </ul>
        <ul>
          {availableSizes.map((availSize) => (
            <li
              key={availSize}
              onClick={() => handleSelectSize(availSize)}
              className={classNames({
                active: selectedSize === availSize,
                disabled: !sizes.includes(availSize),
              })}
            >
              {availSize} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <Button onClick={handleAddPizza} className="button--add" outline>
          <span>Добавить</span>
        </Button>
      </div>
    </div>
  );
}

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.number).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

PizzaBlock.defaultProps = {
  name: "default",
  price: "default",
  types: [],
  sizes: [],
};

export default PizzaBlock;
