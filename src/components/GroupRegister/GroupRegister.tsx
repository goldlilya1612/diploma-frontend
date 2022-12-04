import React from "react";
import "./GroupRegister.css";
import { ReactComponent as AddIcon } from "../../images/add-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { v4 as uuidv4 } from "uuid";
import { IGroupRegister } from "../../interfaces";
import { last } from "lodash";
function GroupRegister({
    dataGroups,
    setDataGroups,
    group,
}: {
    dataGroups: Array<IGroupRegister>;
    setDataGroups: any;
    group: IGroupRegister;
}) {
    const isLast = dataGroups.length > 0 && group.key === last(dataGroups)?.key;

    const handleDeleteGroup = () => {
        const newDataGroups = dataGroups.filter(
            (item) => item.key !== group.key
        );
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
    );
}

export default GroupRegister;
