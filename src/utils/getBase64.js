let getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    cb(base64String);
  };
  reader.onerror = () => console.log("Erorr");
};

export { getBase64 };
