export const loginView = () => `
  <section class="content section-login">
    <form class="login-form" onsubmit="event.preventDefault();">
      <div class="form-title">Login:</div>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email Address"
        aria-label="email"
        class="form-element form-element--small"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        aria-label="password"
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
    <form class="signup-form" onsubmit="event.preventDefault();">
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
        name="email"
        id="email"
        placeholder="Email Address"
        aria-label="email"
        class="form-element form-element--small"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        aria-label="password"
        class="form-element form-element--small"
      />
      <input
        type="submit"
        value="Sign Up"
        class="btn btn--wide btn--naplesYellow"
        name="signup"
        id="signup"
      />
    </form>
  </section>
`;
