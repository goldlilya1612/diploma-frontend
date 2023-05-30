import "./Techs.scss";
import { Link } from "react-router-dom";

function Techs() {
  return (
    <section className="techs">
      {/*<h2 className="section__title">Технологии</h2>*/}
      <div className="techs__wrapper">
        <p className="techs__title">7 технологий</p>
        <p className="techs__text">
          Технологии, которые были применены дипломном проекте.
        </p>
      </div>
      <ul className="tech__links">
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://html.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTML
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://www.w3.org/Style/CSS/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CSS
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://sass-lang.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            SASS
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://www.javascript.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JS
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TypeScript
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://go.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://www.postgresql.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PostgreSQL
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://gorm.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GORM
          </a>
        </li>
        <li className="tech__link-item">
          <a
            className="tech__link"
            href="https://gin-gonic.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gin
          </a>
        </li>
      </ul>
      <Link className="tech__telegram-link" to={"https://t.me/is_diploma_bot"}>
        Ссылка на telegram
      </Link>
    </section>
  );
}

export default Techs;
