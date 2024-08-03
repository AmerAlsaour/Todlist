// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");

// const app = express();
// app.use(bodyParser.json());

// const users = [
//   {
//     username: "sam",
//     password: "$2b$10$IqnkM2xi1eaIVLkCdVDsh.GUUyzoKsThI7/tSvmHhClhBT/2/ItSu",
//     role: "admin",
//   },
//   {
//     username: "alex",
//     password: "$2b$10$upPxWKmRW81NLEyiZKMRNuvJR7J3DG2AWvVB/t.Eu9So4vKNEyMla",
//     role: "user",
//   },
// ];

// const secretKey = "your-secret-key";

// // Sign-up route
// app.post("/signup", async (req, res) => {
//   try {
//     const { username, password, role } = req.body; // Check if username already exists

//     const existingUser = users.find((user) => user.username === username);
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     } // Hash the password

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = { username, password: hashedPassword, role }; // Add the new user to the users array
//     users.push(newUser);
//     res
//       .status(201)
//       .json({ message: "User created successfully", user: newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Login route
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body; // Find user by username

//     const user = users.find((user) => user.username === username);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     } // Compare password

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     } //Generate a JWT token

//     const token = jwt.sign(
//       { user: user.username, role: user.role },
//       secretKey,
//       { expiresIn: "6h" }
//     );
//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Authentication middleware
// function authenticateToken(req, res, next) {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// // Public route accessible to everyone
// app.get("/public", (req, res) => {
//   res.json({ message: "This is a public route" });
// });

// // Protected route accessible only to authenticated users
// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({
//     message: "This is a protected route, you are Authenticated",
//     user: req.user,
//   });
// });

// // Authorization middleware
// function authorize(role) {
//   return (req, res, next) => {
//     if (req.user && req.user.role === role) {
//       next();
//     } else {
//       res.status(403).json({ message: "Forbidden" });
//     }
//   };
// } // Protected route accessible to authenticated users with 'user' role
// app.get("/user", authenticateToken, authorize("user"), (req, res) => {
//   res.json({ message: "This is a user-only route", user: req.user });
// }); // Protected route accessible to authenticated users with 'admin' role
// app.get("/admin", authenticateToken, authorize("admin"), (req, res) => {
//   res.json({ message: "This is an admin-only route", user: req.user });
// });
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
