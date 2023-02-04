import React from "react";
import "./GroupRegister.css";
import { ReactComponent as AddIcon } from "../../images/add-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { v4 as uuidv4 } from "uuid";
import { IDataRegister, IGroupRegister } from "../../interfaces";
import { last } from "lodash";

function GroupRegister({
  data,
  setData,
  group,
}: {
  data: IDataRegister;
  setData: (value: IDataRegister) => void;
  group: IGroupRegister;
}) {
  const isLast =
    data.groups &&
    data.groups.length > 0 &&
    group.key === last(data.groups)?.key;

  const handleDeleteGroup = () => {
    const newDataGroups =
      data.groups && data.groups.filter((item) => item.key !== group.key);
    setData({ ...data, groups: newDataGroups });
  };
  const handleAddGroup = () => {
    setData({
      ...data,
      groups: [
        ...(data.groups as IGroupRegister[]),
        { name: "", key: uuidv4() },
      ],
    });
  };
  const handleChangeGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { value } = target;

    const newDataGroups =
      data.groups &&
      data.groups.map((item) => {
        if (item.key === group?.key) {
          return { ...item, name: value };
        }
        return item;
      });
    setData({ ...data, groups: newDataGroups });
  };

  return (
    <div className="groups-block__wrapper">
      <input
        required
        placeholder="Введите название группы"
        onChange={handleChangeGroups}
        value={group.name}
        type="text"
        name="groups"
        id="groups-1"
        className="section-with-form__input section-with-form__input_groups"
      ></input>
      {isLast ? (
        <AddIcon className="groups-block__button" onClick={handleAddGroup} />
      ) : (
        <DeleteIcon
          onClick={handleDeleteGroup}
          className="groups-block__button"
        />
      )}
    </div>
  );
}

export default GroupRegister;
