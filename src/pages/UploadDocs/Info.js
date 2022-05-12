import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import userApi from "../../apis/user.api";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { getBase64 } from "../../utils/getBase64";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  "upload-container": {
    background: "#fff",
    height: "100%",
    width: "100%",
    paddingTop: "3%",
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  header: {
    display: "flex",
    fontSize: "20px",
    fontWeight: "bolder",
    paddingBottom: "1%",
  },

  "arrow-container": {
    flexBasis: "15%",
    textAlign: "center",
  },
  arrow: {
    cursor: "pointer",
  },
  "header-text": {
    flexBasis: "85%",
  },
  "input-container": {
    textAlign: "center",
    marginTop: "5%",
  },

  input: {
    height: "20%",
    width: "90%",
    border: "2px solid black",
    padding: "12px",
    color: "black",
    borderRadius: "10px",
  },

  "lic-container": {
    marginTop: "5%",
    marginLeft: "5%",
    height: "14%",
    width: "90%",
    border: "2px solid black",
    padding: "12px",
    color: "black",
    borderRadius: "10px",
  },

  lic: {
    padding: "4px",
  },

  "btn-container": {
    textAlign: "center",
    width: "100%",
  },
  btn: {
    marginTop: "5%",
    width: "90%",
    letterSpacing: "2px",
    fontSize: "16px",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid transparent",
    borderRadius: "16px",
    background: "black",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  "error-container": {
    marginTop: "2%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  err: {
    width: "90%",
    background: "rgba(255, 0, 0, 0.747)",
    color: "#fff",
    padding: "10px 10px",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  close: {
    float: "right",
    cursor: "pointer",
  },
});

const initState = {
  model: "",
  reg_no: "",
  dl_no: "",
  rc_no: "",
};

const dl_reg =
  "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$";

const vehicle_no_reg = `^[A-Z]{2}-\\d{2}-[A-Z]{2}-\\d{4}$`;
const Info = () => {
  const classes = useStyles();
  const [info, setInfo] = useState(initState);
  const [img, setImg] = useState({
    dl_img: null,
    rc_img: null,
  });
  const [isReadOnly, setIsReadOnly] = useState(false);
  const { authState } = useGlobalContext();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInfo((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  };
  const imgHandler = (e) => {
    getBase64(e.target.files[0], (res) => {
      setImg((oldData) => {
        return {
          ...oldData,
          [e.target.name]: res,
        };
      });
    });
  };

  const uploadDocs = async () => {
    console.log(info.reg_no.match(vehicle_no_reg), info.dl_no.match(dl_reg));
    if (!info.reg_no.match(vehicle_no_reg)) {
      setErr("Provide Valid Vehicle Number..");
      return;
    }

    if (!info.dl_no.match(dl_reg)) {
      setErr("Provide Valid DL Number..");
      return;
    }
    if (!img.dl_img || img.dl_img === "") {
      setErr("Provide Driving Licenece Image..");
      return;
    }
    if (!img.rc_img || img.rc_img === "") {
      setErr("Provide RC Image..");
      return;
    }
    if (!info.model || !info.rc_no) {
      setErr("Provide All fields.");
      return;
    }

    setIsReadOnly(true);
    userApi.uploadDocs(
      authState.id,
      info,
      img,
      (res) => {
        if (res) {
          console.log(res);
          navigate("/");
        }
      },
      (err) => {
        console.log(err);
      }
    );
    setIsReadOnly(false);
  };

  const closeErr = () => {
    setErr("");
  };
  return (
    <>
      <div className={classes["upload-container"]}>
        <div className={classes.header}>
          <div className={classes["arrow-container"]}>
            <ArrowBackIosNewIcon
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className={classes["header-text"]}>Upload</div>
        </div>

        {err ? (
          <div className={`${classes["error-container"]}`}>
            <div className={classes.err}>
              {err}
              <CloseIcon
                className={classes.close}
                style={{ fontSize: "0.8rem" }}
                onClick={closeErr}
              />
            </div>
          </div>
        ) : null}
        <div className={classes["input-container"]}>
          <input
            type="text"
            className={classes["input"]}
            placeholder="Model Name (i.e. Grand i20, Access)"
            name="model"
            value={info.model}
            onChange={changeHandler}
          />
        </div>

        <div className={classes["input-container"]}>
          <input
            type="text"
            className={classes["input"]}
            placeholder="Registration Number(GJ 01 AA 7777)"
            name="reg_no"
            value={info.reg_no}
            onChange={changeHandler}
          />
        </div>

        <div className={classes["lic-container"]}>
          <div className={classes["lic"]}>Upload License Image</div>
          <input
            type="file"
            accept="image/*"
            className={classes["lic"]}
            id="contained-button-file"
            name="dl_img"
            onChange={imgHandler}
          />
        </div>

        <div className={classes["input-container"]}>
          <input
            type="text"
            className={classes["input"]}
            placeholder="Drivers License Number (GJ01 20220012345)"
            name="dl_no"
            value={info.dl_no}
            onChange={changeHandler}
          />
        </div>

        <div className={classes["lic-container"]}>
          <div className={classes["lic"]}>Upload RC Image</div>
          <input
            type="file"
            accept="image/*"
            className={classes["lic"]}
            id="contained-button-file"
            name="rc_img"
            onChange={imgHandler}
          />
        </div>

        <div className={classes["input-container"]}>
          <input
            type="text"
            className={classes["input"]}
            placeholder="RC Book Number"
            name="rc_no"
            value={info.rc_no}
            onChange={changeHandler}
          />
        </div>

        <div className={classes["btn-container"]}>
          <button
            className={classes.btn}
            onClick={!isReadOnly ? uploadDocs : null}
          >
            Upload Documents
          </button>
        </div>
      </div>
    </>
  );
};

export default Info;
