const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    const res = await this.model.create(data);
    return res;
  }
  async destroy(id) {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) {
      throw new AppError(`unable to find the resource`, StatusCodes.NOT_FOUND);
    }
    return res;
  }
  async get(id) {
    const res = await this.model.findById(id);
    if (res === undefined || res === null) {
      throw new AppError(`unable to find the resource`, StatusCodes.NOT_FOUND);
    }
    return res;
  }
  async getAll(data={}) {
    const res = await this.model.find(data);
    return res;
  }
  async update(id, data) {
    //data must be object
    const res = await this.model.findByIdAndUpdate(id, data);
    if (!res[0]) {
      throw new AppError(`unable to find the resource`, StatusCodes.NOT_FOUND);
    }
    return res;
  }
}
module.exports = CrudRepository;
