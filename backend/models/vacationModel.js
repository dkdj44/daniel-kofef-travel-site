const Joi = require("joi");

class vacationModel {
  constructor(vacation) {
    this.vacationUuid = vacation.vacationUuid;
    this.destination = vacation.destination;
    this.vactionStart = vacation.vactionStart;
    this.vactaionEnds = vacation.vactaionEnds;
    this.price = vacation.price;
    this.description = vacation.description;
    this.vacationImageName = vacation.vacationImageName;
    this.totalFollowers = vacation.totalFollowers;
  }

  static #postValidationSchema = Joi.object({
    vacationUuid: Joi.string().optional(),
    destination: Joi.string().required().min(2).max(35),
    vactionStart: Joi.date().required(),
    vactaionEnds: Joi.date().required(),
    price: Joi.number().required().min(1).max(10000),
    description: Joi.string().required().min(10).max(200),
    totalFollowers: Joi.number().optional(),
    vacationImageName: Joi.string().optional().min(2).max(150),
  });

  static #patchValidationSchema = Joi.object({
    vacationUuid: Joi.string().required(),
    destination: Joi.string().allow("").optional().min(2).max(35),
    vactionStart: Joi.optional(),
    vactaionEnds: Joi.optional(),
    price: Joi.number().optional().allow("").min(1).max(10000),
    description: Joi.string().optional().allow("").min(10).max(200),
    totalFollowers: Joi.number().optional(),
    vacationImageName: Joi.string().optional().min(2).max(150),
  });

  validatePost() {
    const result = vacationModel.#postValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error ? result.error.message : null;
  }

  validatePatch() {
    const result = vacationModel.#patchValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error ? result.error.message : null;
  }
}

module.exports = vacationModel;
