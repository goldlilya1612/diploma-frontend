import "./CourseСard.scss";
import { Link } from "react-router-dom";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";

const CourseCard = ({ course }: { course: ICourseCardProps }) => {
  return (
    <article className="course-card">
      <Link className="course-card-link" to={course.route}>
        <img
          className="course-card__image"
          src={course.imageURL}
          alt={"course-picture"}
        />
        <div className="course-card__info">
          <p className="course-card__category">{course.category}</p>
          <p className="course-card__name">{course.name}</p>
          <p className="course-card__description">{course.description}</p>
          <p className="course-card__creator">
            Создатель: {course.creatorName}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CourseCard;
