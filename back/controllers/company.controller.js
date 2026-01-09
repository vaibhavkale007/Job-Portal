import { Company } from "../models/company.model.js";
import getDataUri from "../utils/data.js";
import cloudinary from "../utils/cloudinary.js";

/* ================= REGISTER COMPANY ================= */
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // schema uses "title"
    const existingCompany = await Company.findOne({ title: companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false,
      });
    }

    const company = await Company.create({
      title: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET ALL COMPANIES ================= */
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("GET COMPANIES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET COMPANY BY ID ================= */
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("GET COMPANY BY ID ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE COMPANY ================= */
export const updateCompany = async (req, res) => {
  try {
    const { title, description, website, location } = req.body;

    let updateData = { title, description, website, location };

    // 🔒 Upload ONLY when file exists AND is valid
    if (req.file) {
      const fileUri = getDataUri(req.file);

      if (fileUri && fileUri.content) {
        const cloudResponse = await cloudinary.uploader.upload(
          fileUri.content
        );
        updateData.logo = cloudResponse.secure_url;
      }
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      success: true,
      company,
    });
  } catch (error) {
    console.log("UPDATE COMPANY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
