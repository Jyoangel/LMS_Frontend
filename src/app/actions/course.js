"use server";

const Course = require("../../Models/Course");
import { connectDB } from "@/utils/database";
import { revalidatePath } from "next/cache";

export const createNewCourse = async (formdata) => {
  try {
    await connectDB();

    const data = {
      courseName: formdata.get("courseName"),
      courseCode: formdata.get("courseCode"),
      primaryInstructorname: formdata.get("primaryInstructorname"),
      instructorEmail: formdata.get("instructorEmail"),
      schedule: {
        classDays: formdata.get("classDays").split(","),
        classTime: formdata.get("classTime"),
        startDate: new Date(formdata.get("startDate")),
        endDate: new Date(formdata.get("endDate")),
      },
      courseObjectives: formdata.get("courseObjectives"),
      supplementaryMaterials: formdata.get("supplementaryMaterials"),
      onlineResources: formdata.get("onlineResources"),
      courseDescription: formdata.get("courseDescription")
    };

    const saveCourse = await new Course(data).save();
    console.log("Save Course Backend", data);
    revalidatePath("/");
  } catch (error) {
    console.error("Error saving course:", error);
  }
};

export const showCourse = async () => {
  try {
    await connectDB();
    const course = await Course.find().exec();

    console.log("Courses data", course);
    return course;
  } catch (error) { }
};

export const updateCourse = async (formData) => {
  try {
    await connectDB();

    const id = formData.id;
    const existingCourse = await Course.findById(id);

    if (!existingCourse) {
      return {
        success: false,
        error: 'Course not found',
      };
    }

    // Update fields with new form data
    existingCourse.courseName = formData.courseName;
    existingCourse.courseCode = formData.courseCode;
    existingCourse.primaryInstructorname = formData.primaryInstructorname;
    existingCourse.instructorEmail = formData.instructorEmail;
    existingCourse.schedule.startDate = formData.startDate;
    existingCourse.schedule.endDate = formData.endDate;
    existingCourse.schedule.classDays = formData.classDays.split(',').map(day => day.trim());
    existingCourse.schedule.classTime = formData.classTime;
    existingCourse.courseObjectives = formData.courseObjectives;
    existingCourse.supplementaryMaterials = formData.supplementaryMaterials;
    existingCourse.onlineResources = formData.onlineResources;
    existingCourse.courseDescription = formData.courseDescription;

    await existingCourse.save();

    return {
      success: true,
      message: 'Course updated successfully',
    };
  } catch (error) {
    console.error('Error updating course:', error);
    return {
      success: false,
      error: 'Failed to update course',
    };
  }
};


export const getCourseById = async (id) => {
  try {
    await connectDB();
    const course = await Course.findOne({ _id: id });

    return course;
  } catch (error) { }
};

export const deleteUser = async (formdata) => {
  try {
    await connectDB();
    const data = {
      _id: formdata.get("id"),
    };

    const result = await Group.findByIdAndDelete(data?._id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: "There was an error deleting",
    };
  }
};

export const deleteCourseData = async (id) => {
  try {
    await connectDB();

    const result = await Course.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: "There was an error deleting",
    };
  }
};

