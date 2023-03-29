export const loginView = () => `
  <section class="content section-login">
    <form id="login-form">
      <div class="form-title">Login:</div>
      <input
        type="email"
        name="loginEmail"
        id="loginEmail"
        placeholder="Email Address"
        aria-label="loginEmail"
        class="form-element form-element--small"
      />

      <input
        type="password"
        name="loginPassword"
        id="loginPassword"
        placeholder="Password"
        aria-label="loginPassword"
        class="form-element form-element--small"
      />
      <input
        type="submit"
        value="Login"
        class="btn btn--wide btn--naplesYellow"
        name="loginBtn"
        id="loginBtn"
      />
    </form>
    <form id="signup-form">
      <div class="form-subtitle">don't have an account?</div>
      <div class="form-title">Sign up:</div>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        aria-label="firstName"
        class="form-element form-element--small"
      />
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        aria-label="lastName"
        class="form-element form-element--small"
      />
      <input
        type="email"
        name="signupEmail"
        id="signupEmail"
        placeholder="Email Address"
        aria-label="signupEmail"
        class="form-element form-element--small"
      />
      <input
        type="password"
        name="signupPassword"
        id="signupPassword"
        placeholder="Password"
        aria-label="signupPassword"
        class="form-element form-element--small"
      />
      <input
        type="submit"
        value="Sign Up"
        class="btn btn--wide btn--naplesYellow"
        name="signupBtn"
        id="signupBtn"
      />
    </form>
  </section>
`;
