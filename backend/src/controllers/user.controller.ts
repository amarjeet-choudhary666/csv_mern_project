import express from "express";
import { ApiError } from "../utils/apiError";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/apiRespnose";
import { asyncHandler } from "../utils/asyncHandler";

export const registerUser = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        email: email.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    // Explicitly return void after sending response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    ) as unknown as void;
});