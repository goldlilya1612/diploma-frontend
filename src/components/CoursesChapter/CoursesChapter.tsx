import "./CoursesChapter.scss";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { last } from "lodash";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ReorderIcon } from "../../images/reorder-icon";
import AddIcon from "../../images/add-icon";
import DeleteIcon from "../../images/delete-icon";

const CoursesChapter = ({
  chapter,
  courseСhapters,
  setCoursesСhapter,
}: {
  chapter: any;
  courseСhapters: any;
  setCoursesСhapter: (value: any) => void;
}) => {
  const isLast = true;
  // const isLast = courseСhapters.length > 0 && chapter.key === last(courseСhapters)?.key;
  const dragControls = useDragControls();
  const y = useMotionValue(0);

  const handleDeleteGroup = () => {
    const newCourseChapters = courseСhapters.filter(
      (item: any) => item.key !== chapter.key
    );
    setCoursesСhapter(newCourseChapters);
  };
  const handleAddGroup = () => {
    setCoursesСhapter([...courseСhapters, { name: "", key: uuidv4() }]);
  };
  const handleChangeGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { value } = target;

    const newDataGroups = courseСhapters.map((item: any) => {
      if (item.key === chapter?.key) {
        return { ...item, name: value };
      }
      return item;
    });
    setCoursesСhapter(newDataGroups);
  };

  return (
    <Reorder.Item
      value={chapter}
      dragListener={false}
      style={{ y }}
      dragControls={dragControls}
    >
      <div className="groups-block__main-wrapper groups-block__main-wrapper_chapter">
        <div className="groups-block__wrapper">
          <input
            required
            placeholder="Введите название группы"
            onChange={handleChangeGroups}
            value={"" /*group.name*/}
            type="text"
            name="groups"
            id={"" /*group.key*/}
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
};

export default CoursesChapter;
