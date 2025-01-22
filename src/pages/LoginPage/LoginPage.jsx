import styleLogin from "./loginPage.module.css";

export function LoginPage(){
  return (
    <>
      <div className={styleLogin.loginContainer}>
        <form action="" className={styleLogin.loginForm}>
          <h1>LOGIN</h1>
          <h1>SIGNUP</h1>
          <h1>MASTER</h1>
        </form>
      </div>
    </>
  )
}