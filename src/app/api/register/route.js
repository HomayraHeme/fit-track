import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // এটা লাগবে password hash করার জন্য

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password || password.length < 6) {
            return NextResponse.json(
                { message: "Name, email, and password (min 6 chars) are required." },
                { status: 400 }
            );
        }

        const db = await connectToDB();
        const users = db.collection("users");

        const existingUser = await users.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await users.insertOne({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date(),
        });

        if (!result.acknowledged) {
            return NextResponse.json(
                { message: "Failed to register user." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "User registered successfully", userId: result.insertedId },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: `Server error occurred: ${error.message}` },
            { status: 500 }
        );
    }
}
