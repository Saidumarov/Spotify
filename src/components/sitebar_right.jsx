import { UserIC, UseraddIC, XIC } from "../constants";
import "../sass/sitebar_right.scss";

const SiteBarRight = () => {
  const arry = [{}, {}, {}];
  return (
    <div className="sitebar_right_w">
      <div className="site_right_top">
        <p>Friend Activity</p>
        <div className="iconR">
          <UseraddIC />
          <XIC />
        </div>
      </div>
      <p className="text_p">
        Let friends and followers on Spotify see what you’re listening to.
      </p>
      {arry.map((_, i) => (
        <div key={i} className="user_isloading">
          <UserIC />
        </div>
      ))}
      <p className="text_p">
        Go to Settings{`>`} Social and enable “Share my listening activity on
        Spotify.’ You can turn this off at any time.
      </p>
      <button className="btn_set"> SETTINGS</button>
    </div>
  );
};

export default SiteBarRight;
