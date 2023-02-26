import "./Promo.scss";
import PromoPicture from "../../images/promo-picture";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Диплом студентов Володиной Лилии и Ксении Махотиной.
      </h1>
      <PromoPicture className="promo__picture" />
    </section>
  );
}

export default Promo;
