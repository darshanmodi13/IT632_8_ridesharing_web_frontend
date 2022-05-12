import React from "react";
// import { makeStyles } from "@mui/styles";
import Navbar from "./Navbar";
import "./Dashboard.css";


const Dashboard = () => {

    return(
        <>
            <Navbar />

            <table>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Vehicle No.</th>
                <th>DL No.</th>
                <th>DL Image</th>
                <th>RC Image</th>
            </tr>
            <tr>
                <td>01</td>
                <td>Darshan Modi</td>
                <td>GJ01MC2001</td>
                <td>GJ1220170009966</td>
                <td>https://drive.google.com/drive/licence-image</td>
                <td>https://drive.google.com/drive/RC-image</td>

            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </table>
        </>
    )
}

export default Dashboard;