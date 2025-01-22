import styleLogin from "./loginPage.module.css";

export function LoginPage(){
  return (
    <>
      <div className={styleLogin.loginContainer}>
        <form action="" className={styleLogin.loginForm}>
          <h1>LOGIN</h1>
          <h1>SIGNUP</h1>
          <h1>MASTER</h1>

          <h1>Full Name</h1>
          <input type="text" /> <br/>
          <h2>Password</h2>
          <input type="text" name="" id="" />
        </form>
      </div>
    </>
  )
}