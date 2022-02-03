const authMethods = {
  getIdToken: function () {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return { id, token, role };
  },

  setIdToken: function (id, token, role) {
    let role_id = 1;
    if (role === "captain") {
      role_id = 2;
    } else if (role === "admin") {
      role_id = 3;
    }
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role_id);
  },

  clearStorage: function () {
    localStorage.clear();
  },
};

export default authMethods;
