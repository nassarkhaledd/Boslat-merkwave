import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/tokenAtom";
import { Navigate } from "react-router-dom";

const RootRedirect: React.FC = () => {
  const [token] = useAtom(tokenAtom);

  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};
export default RootRedirect;