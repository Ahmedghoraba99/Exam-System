require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const userRouter = require("./routes/usersRoutes");
const questionRouter = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const authRouter = require("./routes/authRoutes");
const isAuth = require("./middlewares/auth/isAuth");

const app = express();
const mongoDBURL = process.env.mongoDBURL;
const port = process.env.PORT || 8080;
const swaggerOptions = require("./swagger.json");
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware
app.use(cors());
app.options('*', cors()); // Enable preflight requests for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) =>
  res.json({ message: "Server is running" }).status(200)
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("", authRouter); // Non auth routes
app.use(isAuth); // Locked routes
app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/exams", examRoutes);
app.use("/results", resultRoutes);

// Error handling middleware (must be at the end)
app.use((error, req, res, next) => {
  res.status(500).json({ error: `Server Error: ${error.message}` });
});

// Connect to MongoDB and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));
