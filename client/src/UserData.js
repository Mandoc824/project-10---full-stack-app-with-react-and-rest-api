import axios from "axios";

export default class UserData {
  async getUser(username, password) {
    const response = await axios.get("http://localhost:5000/api/users", {
      auth: {
        username,
        password,
      },
    });
    if (response.status === 200) {
      return response.data.User;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await axios.post("http://localhost:5000/api/users", {
      data: user,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
