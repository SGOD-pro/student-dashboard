import { connectToDatabase } from "@/lib/mongo";
import { StudentModel } from "@/app/connections";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    await connectToDatabase();
    try {
        const id = req.cookies.get("id")?.value;
        const { numbers } = await req.json();
        if (!id) return NextResponse.json({ message: "Can't login" }, { status: 409 });
        
        const result = await StudentModel().findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            {
                $set: {
                    phoneNo: numbers,
                },
            },
        );

        if (!result) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Updated" }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
