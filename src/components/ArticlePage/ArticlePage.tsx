import React, { useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./ArticlePage.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { appSlice } from "../../store/reducers/AppSlice";
import { getArticleContent, updateArticleContent } from "../../utils/mainApi";

function ArticlePage() {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.appReducer.app);
  const { setIsLoading } = appSlice.actions;
  const [value, setValue] = React.useState<any>("**Hello world!!!**");
  const articleId = Number(window.location.pathname.split("/").reverse()[0]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getArticleContent(articleId, localStorage.getItem("token"))
      .then(({ data }) => {
        setValue(data?.content || "**Hello world!!!**");
      })
      .catch((err: any) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, []);

  return (
    <section className="article-page">
      <button
        className="article-page__button"
        onClick={() => {
          updateArticleContent(
            { id: articleId, content: value },
            localStorage.getItem("token")
          )
            .then(({ data }) => {
              const { courseID, articleID } = data;
              const currentOpenCourse = courses?.find(
                (course) => course.id === courseID
              );
              navigate(`/courses/${currentOpenCourse?.route}/${articleID}`);
            })
            .catch((err: any) => {
              console.log(`Ошибка: ${err}`);
            });
        }}
      >
        Сохранить содержание
      </button>
      <MDEditor value={value} onChange={setValue} />
    </section>
  );
}

export default ArticlePage;
