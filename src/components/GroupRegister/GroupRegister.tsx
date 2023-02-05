import React from "react";
import "./GroupRegister.css";
import { ReactComponent as AddIcon } from "../../images/add-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { v4 as uuidv4 } from "uuid";
import { IGroupRegister } from "../../interfaces";
import { last } from "lodash";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { ReorderIcon } from "../../images/reorder-icon";

function GroupRegister({
  dataGroups,
  setDataGroups,
  group,
}: {
  dataGroups: IGroupRegister[];
  setDataGroups: (value: IGroupRegister[]) => void;
  group: IGroupRegister;
}) {
  const isLast = dataGroups.length > 0 && group.key === last(dataGroups)?.key;
  const dragControls = useDragControls();
  const y = useMotionValue(0);

  const handleDeleteGroup = () => {
    const newDataGroups = dataGroups.filter((item) => item.key !== group.key);
    setDataGroups(newDataGroups);
  };
  const handleAddGroup = () => {
    setDataGroups([...dataGroups, { name: "", key: uuidv4() }]);
  };
  const handleChangeGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { value } = target;

    const newDataGroups = dataGroups.map((item) => {
      if (item.key === group?.key) {
        return { ...item, name: value };
      }
      return item;
    });
    setDataGroups(newDataGroups);
  };

  return (
    <Reorder.Item
      value={group}
      dragListener={false}
      style={{ y }}
      dragControls={dragControls}
    >
      <div className="groups-block__main-wrapper">
        <div className="groups-block__wrapper">
          <input
            required
            placeholder="Введите название группы"
            onChange={handleChangeGroups}
            value={group.name}
            type="text"
            name="groups"
            id={group.key}
            className="section-with-form__input section-with-form__input_groups"
          ></input>
          {isLast ? (
            <AddIcon
              className="groups-block__button"
              onClick={handleAddGroup}
            />
          ) : (
            <DeleteIcon
              onClick={handleDeleteGroup}
              className="groups-block__button"
            />
          )}
        </div>
        <ReorderIcon dragControls={dragControls} />
      </div>
    </Reorder.Item>
  );
}

export default GroupRegister;
