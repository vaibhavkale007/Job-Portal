import { Job } from "../models/job.model.js";

/* ================= POST JOB (ADMIN) ================= */
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id; // from auth middleware

    /* ---------------- VALIDATION ---------------- */
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    /* ---------------- SALARY FIX ---------------- */
    const numericSalary = Number(salary);
    if (isNaN(numericSalary) || numericSalary <= 0) {
      return res.status(400).json({
        message: "Salary must be a valid number.",
        success: false,
      });
    }

    /* ---------------- REQUIREMENTS FIX ---------------- */
    const requirementsArray =
      typeof requirements === "string"
        ? requirements.split(",").map((r) => r.trim())
        : [];

    /* ---------------- CREATE JOB ---------------- */
    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary: numericSalary,
      location,
      jobType,
      experienceLevel: experience,
      position: Number(position),
      company: companyId,
      created_by: userId, // ✅ VERY IMPORTANT
    });

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log("POST JOB ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

/* ================= GET ALL JOBS (STUDENT) ================= */
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("GET ALL JOBS ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

/* ================= GET JOB BY ID ================= */
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("GET JOB BY ID ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

/* ================= GET ADMIN JOBS ================= */
export const getAdminJobs = async (req, res) => {
  try {
    console.log("ADMIN ID FROM TOKEN 👉", req.id);

    const jobs = await Job.find({ created_by: req.id })
      .populate("company")
      .sort({ createdAt: -1 });

    console.log("JOBS FOUND 👉", jobs.length);

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("GET ADMIN JOBS ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
