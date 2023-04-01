import "./Profile.scss";
import React from "react";
import { renderFormInput } from "../../hooks/helpers";
import { useAppSelector } from "../../hooks/hooks";

function Profile({ handleLogout }: { handleLogout: any }) {
  const user = useAppSelector((state) => state.userReducer.user);
  return (
    <section className="profile">
      <form className="profile-form">
        {renderFormInput(
          "text",
          true,
          "Имя пользователя",
          "name",
          user.name,
          []
        )}
        {renderFormInput("email", true, "email", "email", user.email, [])}

        <div className="profile__buttons">
          <button type="submit" className="profile__button">
            Редактировать
          </button>
          <button
            onClick={handleLogout}
            type="button"
            className="profile__button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
