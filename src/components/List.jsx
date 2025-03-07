import React from 'react'
import Item from './Item'


const List = ({ items, ondelete }) => {
  if (!items || items.length === 0) {
    return <p>No hay ítems para mostrar</p>;
  }  
  return (
      <>
        {items.map((item) => (
          <Item key={item.item_id} item={item} 
          ondelete={ondelete}
          />
        ))}
      </>
    );
};

export default List;