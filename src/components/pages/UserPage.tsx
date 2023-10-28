import { FC, useContext } from "react";
import { FileAboutContext } from "../../App";

const UserPage: FC = () => {
  const { state: FileAbout } = useContext(FileAboutContext);

  return <div>aaa</div>;
};

export default UserPage;
