import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { useGoogleProvider } from "../hooks/useGoogleProvider";

function Register() {
  const { data, isPending, register } = useRegister();
  const {
    data: _data,
    googleProvider,
    isPending: _isPending,
  } = useGoogleProvider();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const displayName = formData.get("displayName");
    const email = formData.get("email");
    const password = formData.get("password");
    register(displayName, email, password);
  }

  return (
    <section>
      <div className="login-register-wrapper">
        <div className="login-register-left-section hidden md:flex"></div>
        <div className="grid place-items-center login-register-left-section md:bg-none">
          <form onSubmit={handleSubmit} className="w-96">
            <h2 className="login-register-title">Register</h2>
            <FormInput label="Email:" name="email" type="email" />
            <FormInput label="Display Name:" name="displayName" type="text" />
            <FormInput label="Password:" name="password" type="password" />
            <div className="flex items-center gap-5 mt-8 mb-8">
              <button
                type="submit"
                className="btn btn-primary grow"
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Register"}
              </button>
              {!_isPending && (
                <button
                  onClick={googleProvider}
                  type="button"
                  className="btn btn-secondary grow"
                >
                  Google
                </button>
              )}{" "}
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
              If you have an account
              <Link className="link link-primary" to="/login">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
