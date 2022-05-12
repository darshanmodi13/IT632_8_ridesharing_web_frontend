const authMethods = {
  getIdToken: function () {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const mobile = localStorage.getItem("mobile");
    const can_drive = localStorage.getItem("can_drive");
    return { id, token, role, mobile, can_drive };
  },

  setIdToken: function (id, token, role, mobile, can_drive) {
    let role_id = 1;
    if (role === "captain") {
      role_id = 2;
    } else if (role === "admin") {
      role_id = 3;
    }
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role_id);
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("can_drive", can_drive);
  },

  clearStorage: function () {
    localStorage.clear();
  },
};

export default authMethods;
