"use server";

//import { Student } from "@/model/student";
import { connectDB } from "@/utils/database";
import { revalidatePath } from "next/cache";

export const createNewStudent = async (formdata) => {
  try {
    await connectDB();
    const data = {
      name: formdata.get("name"),
      groupName: formdata.get("groupName"),
      rollNo: formdata.get("rollNo"),
      dateOfBirth: formdata.get("dateOfBirth"),
      gender: formdata.get("gender"),
      nationality: formdata.get("nationality"),
      motherTongue: formdata.get("motherTongue"),
      religion: formdata.get("religion"),
      caste: formdata.get("caste"),
      bloodGroup: formdata.get("bloodGroup"),
      contactNumber: formdata.get("contactNumber"),
      aadharNumber: formdata.get("aadharNumber"),
      address: formdata.get("address"),
    };

    const saveStudent = await new Student(data).save();
    console.log("studnet data add ", saveStudent);

    revalidatePath("/");
  } catch (error) { }
};

export const updateStudent = async (formdata) => {
  try {
    await connectDB();

    const id = formdata.get("id");
    const isStudentExist = await Student.findOne({ _id: id });

    if (!isStudentExist) {
      return {
        error: "No User Exists",
      };
    } else {
      const name = formdata.get("name");
      const groupName = formdata.get("groupName");
      const rollNo = formdata.get("rollNo");
      const dateOfBirth = formdata.get("dateOfBirth");
      const gender = formdata.get("gender");
      const nationality = formdata.get("nationality");
      const motherTongue = formdata.get("motherTongue");
      const religion = formdata.get("religion");
      const caste = formdata.get("caste");
      const bloodGroup = formdata.get("bloodGroup");
      const contactNumber = formdata.get("contactNumber");
      const aadharNumber = formdata.get("aadharNumber");
      const address = formdata.get("address");

      const response = await Student.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            groupName,
            rollNo,
            dateOfBirth,
            gender,
            nationality,
            motherTongue,
            religion,
            caste,
            bloodGroup,
            contactNumber,
            aadharNumber,
            address,
          },
        },
        { new: true }
      );

      console.log("Update Student response", response);
    }
  } catch (error) { }
};

export const showStudent = async () => {
  try {
    await connectDB();
    const students = await Student.find().exec();
    return students;
  } catch (error) { }
};

export const getStudentById = async (id) => {
  try {
    await connectDB();
    const student = await Student.findOne({ _id: id });

    return student;
  } catch (error) { }
};

export const deleteStudent = async (formdata) => {
  try {
    await connectDB();
    const data = {
      _id: formdata.get("id"),
    };

    const result = await Student.findByIdAndDelete(data?._id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: "There was an error deleting",
    };
  }
};

export const deleteStudentClientSide = async (id) => {
  try {
    await connectDB();

    const result = await Student.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: "There was an error deleting",
    };
  }
};
