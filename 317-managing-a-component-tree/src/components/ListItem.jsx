import { useState } from "react";

export function ListItem({ todoItem, deleteItem, id }) {
  // const [doneList, setDoneList] = useState(false);

  // function handleDoneList() {
  //   // if (doneList === false) {
  //   //   setDoneList(true);
  //   // } else {
  //   //   setDoneList(false);
  //   // }

  //   setDoneList((prev) => {
  //     return (
  //       !prev
  //     )
  //   })
  // }

  return (
    <div onClick={() => {
      deleteItem(id)
    }}>
      {/* {doneList ? (
        <li className="listItem">{todoItem}</li>
      ) : (
        <li>{todoItem}</li>
      )} */}

      <li>{todoItem}</li>
    </div>
  );
}
