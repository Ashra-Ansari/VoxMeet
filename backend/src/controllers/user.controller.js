import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Meeting } from "../models/meeting.model.js";

const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({
      message: "Name, username and password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User Registered",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    return res.status(400).json({
      message: "Valid username and password are required",
    });
  }
  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(httpStatus.OK).json({ token });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUserHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const meetings = await Meeting.find({
      user_id: user.username,
    });

    return res.status(200).json(meetings);
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addToHistory = async (req, res) => {
  const { meeting_code } = req.body;

  if (typeof meeting_code !== "string" || !meeting_code.trim()) {
    return res.status(400).json({
      message: "Invalid meeting code",
    });
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    return res.status(201).json({
      message: "Added code to history",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export { login, register, getUserHistory, addToHistory };
