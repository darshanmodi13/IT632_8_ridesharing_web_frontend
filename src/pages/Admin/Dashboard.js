import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "./Dashboard.module.css";
import userApi from "../../apis/user.api";

const Dashboard = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  let getData = () => {
    userApi.getDocs(
      (res) => {
        setDocs(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th}>No.</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Vehicle No.</th>
          <th className={styles.th}>DL No.</th>
          <th className={styles.th}>DL Image</th>
          <th className={styles.th}>RC Image</th>
          <th className={styles.th}>Verify</th>
          <th className={styles.th}>Cancel</th>
        </tr>
        {docs.length !== 0
          ? docs.map((d, i) => {
              return <TableRow doc={d} key={i} id={i + 1} />;
            })
          : null}
      </table>
    </>
  );
};

const TableRow = (props) => {
  const verifyDocs = async (id) => {
    await userApi.verifyDocs(
      id,
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const deleteDocs = async (id) => {
    await userApi.delete(
      id,
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      <tr className={styles.tr}>
        <td className={styles.td}>{props.id}</td>
        <td className={styles.td}>{props.doc.user_id.name}</td>
        <td className={styles.td}>{props.doc.reg_no}</td>
        <td className={styles.td}>{props.doc.rc_no}</td>
        <td className={styles.td}>
          <a href={props.doc.dl_img} target="_blank">
            DL Image Link
          </a>
        </td>
        <td className={styles.td}>
          <a href={props.doc.rc_img} target="_blank">
            RC Image Link
          </a>
        </td>
        <td>
          <button
            onClick={() => {
              verifyDocs(props.doc._id);
            }}
          >
            Verify
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              deleteDocs(props.doc._id);
            }}
          >
            Cancel
          </button>
        </td>
      </tr>
    </>
  );
};

export default Dashboard;
