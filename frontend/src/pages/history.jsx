import { useContext, useEffect, useState } from "react";
import styles from "../styles/history.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import server from "../env";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();

        setMeetings(Array.isArray(history) ? history : []);
      } catch {
        console.error("Error fetching history");
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleDeleteHistory = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await axios.delete(
        `${server}/api/v1/users/delete_activity/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update the displayed history after deletion
      const updatedHistory = await getHistoryOfUser();

      // If getHistoryOfUser returns the history array:
      setMeetings(updatedHistory);

      alert(response.data.message);
    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.status,
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to delete meeting.");
    }
  };
  return (
    <div>
      <IconButton
        onClick={() => {
          routeTo("/home");
        }}
      >
        <HomeIcon />
      </IconButton>
      {meetings.length !== 0 ? (
        meetings.map((e, i) => {
          return (
            <>
              <Card
                key={e._id}
                variant="outlined"
                className={styles["history-card"]}
              >
                <CardContent className={styles["history-card-content"]}>
                  <div className={styles["history-details"]}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Code: {e.meetingCode}
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Date: {formatDate(e.date)}
                    </Typography>
                  </div>

                  <IconButton
                    className={styles["delete-button"]}
                    aria-label="Delete meeting"
                    onClick={() => handleDeleteHistory(e._id)}
                  >
                    🗑️
                  </IconButton>
                </CardContent>
              </Card>{" "}
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
