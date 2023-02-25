import "./ErrorPage.scss";
import NotFoundErrorIcon from "../../images/404-error-icon";

function ErrorPage() {
  const handleButtonClick = () => {
    window.history.back();
  };

  return (
    <section className="error">
      <NotFoundErrorIcon className={"error__image"} />
      <p className="error__message">Страница не найдена</p>
      <button onClick={handleButtonClick} className="error__button">
        Назад
      </button>
    </section>
  );
}

export default ErrorPage;
