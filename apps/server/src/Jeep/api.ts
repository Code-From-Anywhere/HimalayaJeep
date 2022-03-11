import md5 from "md5";
import { User } from "./model";
import sgMail from "@sendgrid/mail";
import { WithDataValues } from "sensible-server";
import { isEmail, slugify, uuid } from "sensible-core";
import Constants from "../constants";
import server from "server";
import { createInitialTasks } from "./createInitialTasks";

const { json } = server.reply;

import { makeEndpoint } from "../makeEndpoint";
import { meUserFields, publicUserFields, UserType } from "core";
import { PublicConstants } from "core";

module.exports = [
  makeEndpoint("users", "GET", async (ctx) => {
    const users = await User.findAll({
      attributes: publicUserFields,
      where: { verified: true },
    });

    return { success: true, users };
  }),

  makeEndpoint("login", "POST", async (ctx) => {
    const { email, password } = ctx.body;
    console.log("login route called", email, password);

    if (!email || !password) {
      return {
        response: "No email or password given",
        success: false,
      };
    }

    if (!isEmail(email)) {
      return { success: false, response: "Invalid email address" };
    }

    const user = await User.findOne({
      where: { email, password: md5(password) },
    });

    if (!user) {
      return {
        success: false,
        response: "Can't find anyone with that login information.",
      };
    }

    if (!user.verified) {
      return {
        success: false,
        response: "Please verify your account",
      };
    }
    return {
      success: true,
      response: "Logged in, now redirecting...",
      loginToken: user.loginToken,
    };
  }),

  makeEndpoint("signupWithEmail", "POST", async (ctx) => {
    const { email, loginToken, password } = ctx.body;
    console.log("signup with emaim called", ctx.body);
    // checking is user already exist?
    if (email && password) {
      const isUserExist = (await User.findOne({
        where: { email, password: md5(password) },
      })) as WithDataValues<User>;
      console.log("user info", isUserExist);
      if (isUserExist?.email && !isUserExist?.verified) {
        const code = String(Math.round(Math.random() * 89999999 + 10000000));
        // const url = `${Constants.DOMAIN}/activate?code=${code}`;
        const url = `http://localhost:3001/activate?code=${code}`;
        const msg = {
          to: email,
          from: Constants.email,
          subject: "Welcome to King",
          html: `You have signed up to <b>King</b>. To continue, please verify your email <a href="${url}">here</a>.`,
        };

        sgMail.send(msg).then(() => {
          //email succesfully sent
        }, console.error);

        return {
          success: false,
          response: "Please verify your email",
        };
      }

      if (isUserExist?.email) {
        return {
          success: true,
          response: "Login Successfull",
          me: isUserExist,
        };
      }
    }

    //Checking is email exist
    const isEmailExist = await User.findOne({ where: { email } });
    if (isEmailExist?.email) {
      return { success: false, response: "Invalid password" };
    }

    // Signing up with existing token
    const user = await User.findOne({ where: { loginToken } });
    if (!user?.id) {
      return { success: false, response: "Invalid token." };
    }
    const code = String(Math.round(Math.random() * 89999999 + 10000000));
    const updateRes = await User.update(
      { verified: false, code, email, password: md5(password) },
      { where: { loginToken } }
    );

    const url = `${Constants.DOMAIN}/activate?code=${code}`;
    const msg = {
      to: email,
      from: Constants.email,
      subject: "Welcome to King",
      html: `You have signed up to <b>King</b>. To continue, please verify your email <a href="${url}">here</a>.`,
    };

    sgMail.send(msg).then(() => {
      //email succesfully sent
    }, console.error);

    return {
      success: true,
      me: {
        id: user.id,
        email: user.email,
        verified: false,
        loginToken,
      },
      response: "Please verify your email!",
    };
  }),

  makeEndpoint("signup", "POST", async (ctx) => {
    const {
      username,
      email,
      name,
      image,
      base64,
      password,
      source,
      subscribeToNewsletter,
    } = ctx.body;

    if (!isEmail(email))
      return { success: false, response: "Invalid email address" };

    if (password && password.length < 6) {
      return {
        success: false,
        response: "Password must be at least 6 characters long",
      };
    }

    if (username && username.length < 3) {
      return {
        success: false,
        response: "Your username must be at least 3 characters long",
      };
    }

    if (username && username.length > 20) {
      return {
        success: false,
        response: "Your username can't be longer than 20 characters",
      };
    }

    if (username) {
      const usernameAlready = await User.findOne({ where: { username } });

      if (usernameAlready) {
        return { success: false, response: "Username already in use" };
      }
    }

    const emailAlready = await User.findOne({ where: { email } });

    if (emailAlready) {
      return { success: false, response: "Email already in use" };
    }

    const code = String(Math.round(Math.random() * 89999999 + 10000000));

    const body: Partial<UserType> = {
      email,
      verified: false,
      code,
      source,
      loginToken: uuid(),
    };

    if (subscribeToNewsletter !== undefined)
      body.subscribedToNewsletter = subscribeToNewsletter;

    if (name) body.name = name;
    if (username) body.username = slugify(username);
    if (password) body.password = md5(password);

    if (
      image !== undefined &&
      typeof image === "string" &&
      image.includes(Constants.CLOUDFRONT_DOMAIN) &&
      base64 !== undefined
    ) {
      body.image = image;
      body.base64 = base64;
    }

    const createdUser = await User.create(body);

    if (!createdUser) {
      return {
        success: false,
        response: "Something went wrong signing you up",
      };
    }

    const url = `${Constants.DOMAIN}/activate?code=${code}`;
    const msg = {
      to: email,
      from: Constants.email,
      subject: "Welcome to King",
      html: `You have signed up to <b>King</b>. To continue, please verify your email <a href="${url}">here</a>.`,
    };

    sgMail.send(msg).then(() => {
      //email succesfully sent
    }, console.error);

    const shouldScheduleCrons = true;
    //Create the initial tasks
    const createdTask = await createInitialTasks(
      createdUser.id,
      shouldScheduleCrons
    );

    return {
      success: true,
      response: "Welcome to King! Please verify your email so you can login.",
      //need to add a param here to say if the tasks have been created or not
    };
  }),

  makeEndpoint("activate", "POST", async (ctx) => {
    const { code, email } = ctx.body;

    console.log("Email activation called", ctx.body);

    // Verify user by code
    if (!email && code) {
      const findUserByCode = await User.findOne({
        where: { code: code },
      });
      if (findUserByCode?.verified) {
        return { success: true, response: "You are already verified" };
      }
      if (findUserByCode?.email && !findUserByCode.verified) {
        const [updated] = await User.update(
          { verified: true },
          { where: { code, verified: false } }
        );

        if (updated !== 1) {
          return { success: false, response: "Something went wrong" };
        } else {
          const msg = {
            to: findUserByCode.email,
            from: Constants.email,
            subject: `Welcome to ${PublicConstants.appName}!`,
            html: `Your account has been activated. We're stoked to have you onboard`,
          };
          sgMail.send(msg);
          return { success: true, response: "Email Verify Successfully" };
        }
      } else {
        return { success: false, response: "Code invalid" };
      }
    }

    const findUser = await User.findOne({
      where: { code, email, verified: false },
    });

    if (!findUser) {
      return { success: false, response: "Code invalid" };
    }

    const loginToken = uuid();

    const [updated] = await User.update(
      { verified: true, loginToken },
      { where: { code, email, verified: false } }
    );

    if (updated !== 1) {
      return { success: false, response: "Something went wrong" };
    }

    if (findUser.email) {
      const msg = {
        to: findUser.email,
        from: Constants.email,
        subject: `Welcome to ${PublicConstants.appName}!`,
        html: `Your account has been activated. We're stoked to have you onboard`,
      };
      sgMail.send(msg);
    }

    return {
      success: true,
      loginToken,
      response: "You have activated your account.",
    };
  }),

  makeEndpoint("me", "GET", async (ctx) => {
    console.log("me endpoint being accessed");
    const { loginToken } = ctx.body;

    if (!loginToken) {
      // create anonymous user
      const body: Partial<UserType> = {
        verified: false,
      };

      body.loginToken = uuid();
      const { loginToken, id } = await User.create(body);

      const me = (await User.findOne({
        where: { loginToken },
        attributes: meUserFields,
      })) as WithDataValues<User>;

      const shouldScheduleCrons = true;
      //Create the initial tasks
      const createdTask = await createInitialTasks(id, shouldScheduleCrons);

      return { success: true, loginToken, me, response: "Created new user" };
    }

    const me = (await User.findOne({
      where: { loginToken },
      attributes: meUserFields,
    })) as WithDataValues<User>;

    if (!me) {
      return { success: false, response: "Couldn't find me" };
    }

    return { success: true, response: "Found me", me };
  }),

  makeEndpoint("updatePassword", "POST", async (ctx) => {
    const { current, password1, password2, loginToken } = ctx.body;

    if (!loginToken) {
      return { response: "Unauthenticated", success: false };
    }

    if (!current || !password1 || !password2) {
      return {
        response: "Please fill in all fields",
        success: false,
      };
    }

    const me = await User.findOne({ where: { loginToken } });

    if (!me) {
      return { response: "Unauthenticated", success: false };
    }

    if (me.password !== md5(current)) {
      return { response: "Wrong password", success: false };
    }

    if (password1 !== password2) {
      return {
        response: "Those passwords don't match",
        success: false,
      };
    }

    if (password1.length < 6 || password1.length > 64) {
      return {
        response: "Password must be between 6 and 64 characters",
        success: false,
      };
    }

    const [updated] = await User.update(
      { password: md5(password1) },
      { where: { id: me.id } }
    );

    if (!updated) {
      return { response: "Something went wrong", success: false };
    }

    return {
      response: "Your password has been changed",
      success: true,
    };
  }),

  makeEndpoint("updateUser", "POST", async (ctx) => {
    const { loginToken, code, name, image, base64, role } = ctx.body;

    if (!loginToken) {
      return { success: false, response: "No logintoken given" };
    }

    const already = await User.findOne({ where: { loginToken } });

    if (already) {
      const update: Partial<UserType> = {
        onlineAt: Date.now(),
      };
      if (name !== undefined) update.name = name;

      if (role === "default") update.role = role;

      if (image !== undefined) update.image = image;
      if (base64 !== undefined) update.base64 = base64;

      if (code === already.code) {
        update.verified = true;
      }

      User.update(update, { where: { loginToken } });

      return {
        success: Object.keys(update).length > 1,
        response: "Updated your profile",
      };
    }

    return { success: false, response: "Could not authenticate." };
  }),

  makeEndpoint("user", "GET", async (ctx) => {
    const { slug } = ctx.body;

    const userObj = await User.findOne({
      where: { username: slug },
    });

    return { user: userObj };
  }),

  makeEndpoint("loginVerify", "POST", async (ctx) => {
    const { phone, email, code } = ctx.body;

    console.log("loginVerify", { phone, email, code });
    if (!code || (!email && !phone)) {
      return { success: false, response: "Please fill in all needed fields" };
    }
    const where = email && isEmail(email) ? { email, code } : { phone, code };
    const foundUser = await User.findOne({ where });

    if (!foundUser) {
      return { success: false, response: "Couldn't find user" };
    }
    User.update(
      { verified: true },
      { where: { loginToken: foundUser.loginToken } }
    );

    return {
      loginToken: foundUser.loginToken,
      success: true,
      response: "Found it",
    };
  }),

  makeEndpoint("forgotPassword", "POST", async (ctx) => {
    const { email } = ctx.body;

    if (!email) {
      return {
        response: "No email given",
        success: false,
      };
    }

    const user = await User.findOne({
      where: { email, verified: true },
    });

    if (!user) {
      return {
        success: false,
        response: "Can't find anyone with that email.",
      };
    }

    const resetPasswordHash = uuid();
    await User.update({ resetPasswordHash }, { where: { id: user.id } });

    const url = `${Constants.DOMAIN}/reset-password?hash=${resetPasswordHash}&email=${user.email}`;

    if (user.email) {
      const msg = {
        to: user.email,
        from: Constants.email,
        subject: "Reset your password",
        html: `You requested a password reset. <br /><br />Click <a href="${url}">here</a> to change your password.`,
      };

      sgMail.send(msg);
    }

    return {
      success: true,
      response: "Password reset request approved. You've got mail.",
    };
  }),

  makeEndpoint("resetPassword", "GET", async (ctx) => {
    const { email, hash, password1, password2 } = ctx.body;

    if (!email || !hash || !password1 || !password2) {
      return {
        response: "Not all fields filled in",
        success: false,
      };
    }

    const user = await User.findOne({
      where: { email, resetPasswordHash: hash, verified: true },
    });

    if (!user) {
      return {
        success: false,
        response: "Unauthorized.",
      };
    }

    if (password1 !== password2) {
      return { response: "Passwords don't match", success: false };
    }

    await User.update(
      { password: md5(password1), resetPasswordHash: null },
      { where: { id: user.id } }
    );

    if (user.email) {
      const msg = {
        to: user.email,
        from: Constants.email,
        subject: "Password changed",
        html: `You changed your password succesfully. <br /><br />`,
      };

      sgMail.send(msg);
    }
    return {
      success: true,
      response: "Password changed",
    };
  }),
];
