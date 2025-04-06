import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useGoogleProvider } from "../hooks/useGoogleProvider";

function Login() {
  const { data, isPending, register } = useLogin();
  const {
    data: _data,
    googleProvider,
    isPending: _isPending,
  } = useGoogleProvider();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    register(email, password);
  }
  return (
    <section>
      <div className="login-register-wrapper">
        <div className="login-register-left-section hidden md:flex"></div>
        <div className="grid place-items-center login-register-left-section md:bg-none">
          <div className="overlay"></div>
          <form onSubmit={handleSubmit} className="w-96 relative z-20 ">
            <h2 className="login-register-title">Login</h2>
            <FormInput label="Email:" name="email" type="email" />
            <FormInput label="Password:" name="password" type="password" />
            <div className="flex items-center gap-5 mt-8 mb-8">
              <button
                onSubmit={handleSubmit}
                type="submit"
                className="btn btn-primary grow"
              >
                Login
              </button>
              {!_isPending && (
                <button
                  onClick={googleProvider}
                  type="button"
                  className="btn btn-secondary grow"
                >
                  Google
                </button>
              )}
              {_isPending && (
                <button
                  type="button"
                  className="btn btn-secondary grow"
                  disabled
                >
                  Loading...
                </button>
              )}
            </div>
            <p className="text-center opacity-75">
              If you don`t have account
              <Link className="link link-primary" to="/register">
                {" "}
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
