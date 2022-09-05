import Header from "../../components/Header/Header";
import { DivBack } from "./styles";
import ModalRegister from "../../components/ModalRegister/ModalRegister";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import api from "../../server/api";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const { isLogin, setIsLogin, isRegister, setIsRegister } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitFunction = async (data: any) => {
    console.log(data);
    try {
      const response = await api.post("login", {
        email: data.email,
        password: data.password,
      });
      const { user, accessToken } = response.data;
      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      localStorage.setItem("@TOKEN", accessToken);
      setIsLogin(true);
      console.log(response);
      console.log(user);
      console.log(accessToken);

      response.status === 200 &&
        navigate("/pesquisadesaparecidos", { replace: true });

      // navigate("dashboard", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      <Header />
      {!isLogin &&
        (!isRegister ? (
          <>
            <DivBack>
              <form onSubmit={handleSubmit(onSubmitFunction)}>
                <h3>Login</h3>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu email"
                  {...register("email")}
                />
                <label>Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                />

                <button type="submit" className="register">
                  Logar
                </button>
                <div>
                  <p>
                    Ainda não tem cadastro?{" "}
                    <button type="button" onClick={() => setIsRegister(true)}>
                      cadastre-se
                    </button>
                  </p>
                </div>
              </form>
            </DivBack>
            <Footer color={"rgba(10,178,230,1)"} />
          </>
        ) : (
          <>
            <ModalRegister />
            <Footer color={"rgba(10,178,230,1)"} />
          </>
        ))}
    </>
  );
}
