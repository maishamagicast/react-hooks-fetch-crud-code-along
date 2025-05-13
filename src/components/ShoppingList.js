import React, { useState } from "react";
import {useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch ("http://localhost:4000/items")
    .then(r=>r.json())
    .then(data=>setItems(data))
  },[])

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function inShoppingList(newItem){
    console.log(`Shoppping List: ${newItem}`)
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={inShoppingList} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
