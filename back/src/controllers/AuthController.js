const { StatusCodes } = require("http-status-codes");
const {
  UserModel,
  SecurityQuestionModel,
} = require("../database/models/associations");

const { ValidationError } = require("sequelize");
const { update } = require("../database/models/basics/UserModel");

const register = (req, res) => {
  const data = req.body;

  if (data.account_type === "USUARIO") {
    userData = {
      email: data.email,
      password: data.password,
      account_type: data.account_type,
      user_fullname: data.user_fullname,
      birthdate: data.birthdate,
      security_question_id: data.security_question_id,
      security_answer: data.security_answer,
    };
  } else if (data.account_type === "EMPRESA") {
    userData = {
      email: data.email,
      password: data.password,
      account_type: data.account_type,
      CUIT: data.CUIT,
      company_name: data.company_name,
      company_description: data.company_description,
      security_question_id: data.security_question_id,
      security_answer: data.security_answer,
    };
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid account type" });
    return;
  }

  UserModel.create(userData)
    .then((user) => {
      res.status(StatusCodes.CREATED).json(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: `Error creating user: ${err}` });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: `Error creating user: ${err}` });
      }
    });
};

const login = async (req, res) => {
  const data = req.body;

  try {
    const user = await UserModel.findOne({
      where: {
        email: data.email,
        password: data.password,
      },
      include: [
        {
          model: SecurityQuestionModel,
          as: "security_questions",
        },
      ],
    });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }

    return res.status(StatusCodes.OK).json({ Token: "token", user });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const answer = async (req, res) => {
  const data = req.body;
  const { email } = req.params;
  const newPass = "nueva pass temporal";

  try {
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Inexistent user" });
    }

    if (data.security_answer === user.security_answer) {
      user.update({ password: newPass });
      return res.status(StatusCodes.OK).json({ newPass });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid security answer" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const updatePass = async (req, res) => {
  const { email } = req.params;
  const data = req.body;
  try {
    const user = await UserModel.findOne({ where: { email: email } }); // Primero, busca el usuario por mail
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Inexistent user" });
    }
    user.update({ password: data.new_password }); // Actualizamos la contraseña del usuario
    return res
      .status(StatusCodes.OK)
      .json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const authController = {
  login,
  register,
  answer,
  updatePass,
};

module.exports = authController;
