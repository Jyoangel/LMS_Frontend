"use server";

import { Group } from "@/model/group";
import { connectDB } from "@/utils/database";
import { revalidatePath } from "next/cache";

export const createNewGroup = async (formdata) => {
  try {
    await connectDB();
    const data = {
      class: formdata.get("class"),

      groupName: formdata.get("groupName"),
    };

    const saveGroup = await new Group(data).save();
    revalidatePath("/");
  } catch (error) {}
};

export const updateGroup = async (formdata) => {
  try {
    await connectDB();

    const id = formdata.get("id");
    const isGroupExist = await Group.findOne({ _id: id });

    if (!isGroupExist) {
      return {
        error: "No User Exists",
      };
    } else {
      const groupName = formdata.get("groupName");
      const groupClass = formdata.get("groupClass");

      const response = await Group.findByIdAndUpdate(
        id,
        {
          $set: { groupName, groupClass },
        },
        { new: true }
      );

      console.log("asmndbmafs", response);
    }
  } catch (error) {}
};

export const showGroups = async () => {
  try {
    await connectDB();
    const groups = await Group.find().exec();

    console.log("groups data", groups);
    return groups;
  } catch (error) {}
};

export const getGroupById = async (id) => {
  try {
    await connectDB();
    const group = await Group.findOne({ _id: id });

    return group;
  } catch (error) {}
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

export const deleteUserClientSide = async (id) => {
  try {
    await connectDB();

    const result = await Group.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: "There was an error deleting",
    };
  }
};
