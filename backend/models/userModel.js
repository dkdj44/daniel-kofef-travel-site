const Joi = require("joi");

class userModel {
  constructor(user) {
    this.userUuid = user.userUuid;
    this.userName = user.userName;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.token = user.token;
  }

  static #postValidationSchema = Joi.object({
    userUuid: Joi.string().optional(),
    userName: Joi.string().required().min(5).max(20),
    password: Joi.string().required().min(6).max(20),
    firstName: Joi.string().required().min(2).max(20),
    lastName: Joi.string().required().min(2).max(20),
    token: Joi.string().optional(),
  });

  validatePost() {
    const result = userModel.#postValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error ? result.error.message : null;
  }
}

module.exports = userModel;
