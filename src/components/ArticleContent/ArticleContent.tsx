import "./ArticleContent.scss";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { appSlice } from "../../store/reducers/AppSlice";
import { getArticleContent } from "../../utils/mainApi";
import EmptyState from "../EmptyState/EmptyState";

const ArticleContent = () => {
  const [articleContent, setArticleContent] = useState("");
  const articleId = Number(window.location.pathname.split("/").reverse()[0]);
  const dispatch = useAppDispatch();
  const { setIsLoading } = appSlice.actions;
  const user = useAppSelector((state) => state.userReducer.user);
  const isLector = user.role === EUserRole.LECTURER;

  useEffect(() => {
    setIsLoading(true);
    getArticleContent(articleId, localStorage.getItem("token"))
      .then(({ data }) => {
        setArticleContent(data?.content);
      })
      .catch((err: any) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, []);

  if (articleContent === "") {
    return (
      <section className={"article-content"}>
        <EmptyState text={"Содержание статьи пустое"} />
      </section>
    );
  } else
    return (
      <section className={"article-content"}>
        {isLector ? (
          <Link
            to={`/courses/create-article/${articleId}`}
            className="article-content__button"
          >
            Редактировать содержание
          </Link>
        ) : null}
        <MDEditor.Markdown
          source={articleContent}
          style={{ whiteSpace: "pre-wrap", marginTop: "30px" }}
        />
      </section>
    );
};

export default ArticleContent;
