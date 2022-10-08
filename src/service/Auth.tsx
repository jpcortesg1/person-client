import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut, setAccess } from "../features/auth/authSlice";

export default function Auth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accToken = localStorage.getItem("access");
    if (accToken) {
      const decoded: any = jwt_decode(accToken as string);
      const isExpired = decoded?.exp < Date.now() / 1000;

      const refreshToken = async () => {
        try {
          const refresh = localStorage.getItem("refresh");
          const decoded: any = jwt_decode(refresh as string);
          const isExpired = decoded?.exp < Date.now() / 1000;
          if (isExpired) dispatch(logOut());
          const { data } = await axios.post(
            "https://django-person-crud.onrender.com/api/token/refresh/",
            {
              refresh,
            }
          );
          const { access } = data;
          dispatch(setAccess(access));
        } catch (error) {
          console.log(error);
        }
      };

      if (isExpired) {
        refreshToken();
      }
    }
  }, [dispatch]);

  return <></>;
}
