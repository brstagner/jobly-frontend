import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to to the API.
 */

class JoblyApi {
  // REST Methods

  /** General GET method */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}${endpoint}`;
    const headers = { Authorization: `Bearer ${localStorage.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** General POST method */
  static async add(endpoint, data = {}, method = "post") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const headers = { Authorization: `Bearer ${localStorage.token}` };
    const params = method === "post" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** General PATCH method */
  static async edit(endpoint, data = {}, method = "patch") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const headers = { Authorization: `Bearer ${localStorage.token}` };
    const params = method === "patch" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API Routes

  // Company Routes

  /** Get all companies, search by name, min/max employees */
  static async getCompanies(searchData) {
    const { name, minEmployees, maxEmployees } = searchData;
    let endpoint = "?";
    try {
      if (name) {
        endpoint += `name=${name}&`;
      }
      if (minEmployees) {
        endpoint += `minEmployees=${minEmployees}&`;
      }
      if (maxEmployees) {
        endpoint += `maxEmployees=${maxEmployees}`;
      }
      let res = await this.request(`companies/${endpoint}`);
      return res.companies;
    } catch (error) {
      return error.message;
    }
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    let company = res.company;
    return company;
  }

  /** Get open jobs for a given hiring company */
  static async getCompanyJobs(handle) {
    let res = await this.request("jobs");
    let jobs = res.jobs.filter((job) => job.companyHandle === handle);
    return jobs;
  }

  // Job Routes

  /** Get all jobs, search by title, min salary, equity */
  static async getJobs(searchData) {
    const { title, minSalary, hasEquity } = searchData;
    let endpoint = "?";
    try {
      if (title) {
        endpoint += `title=${title}&`;
      }
      if (minSalary) {
        endpoint += `minSalary=${minSalary}&`;
      }
      if (hasEquity) {
        endpoint += `hasEquity=true`;
      }
      let res = await this.request(`jobs/${endpoint}`);
      return res.jobs;
    } catch (error) {
      return error.message;
    }
  }

  /** Get details on a job by id. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  // User Routes

  /** Get all users */
  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  /** Get details on a user by username. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Add a new user to database */
  static async addUser(user) {
    const res = await this.add(`auth/register`, user, "post");
    return res;
  }

  /** Login a user, get a token */
  static async loginUser(user) {
    const res = await this.add(`auth/token`, user, "post");
    return res;
  }

  /** Update user information */
  static async editUser(username, user) {
    await this.edit(`users/${username}`, user, "patch");
  }

  /** Add a new user/job key to applications table in database */
  static async apply(username, jobId) {
    await this.add(`users/${username}/jobs/${jobId}`);
  }
}

export default JoblyApi;
