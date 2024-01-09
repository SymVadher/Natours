class ApiFeatures {
  constructor(query, userQuery) {
    this.query = query;
    this.userQuery = userQuery;
  }

  filter() {
    let queryString = { ...this.userQuery };
    const exclude = ["field", "sort", "limit", "page"];
    exclude.forEach((el) => delete queryString[el]);
    queryString = JSON.stringify(queryString).replace(
      /\b(lte|lt|gte|gt)\b/g,
      (match) => `$${match}`
    );
    queryString = JSON.parse(queryString);
    this.query = this.query.find(queryString);
    return this;
  }

  sort() {
    if (this.userQuery["sort"]) {
      this.query = this.query.sort(this.userQuery["sort"]);
    } else {
      this.query = this.query.sort("_id");
    }
    return this;
  }

  select() {
    if (this.userQuery.field) {
      const field = this.userQuery.field.split(",").join(" ");
      this.query = this.query.select(`-_id ${field}`);
    }
    return this;
  }

  paginate() {
    const pages = this.userQuery.page || 1;
    const limit = this.userQuery.limit || 100;
    const skip = (pages - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
