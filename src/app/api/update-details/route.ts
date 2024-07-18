import { connectToDatabase } from "@/lib/mongo";
import { StudentModel } from "@/app/connections";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	connectToDatabase();
	try {
		const id = req.cookies.get("id");
		const { phoneNo } = await req.json();
		if (!id) return Response.json({ message: "Cann't login" }, { status: 409 });
		await StudentModel().findOneAndUpdate(id, {
			$set: {
				phoneNo,
			},
		});
		return Response.json({ message: "Updated" }, { status: 200 });
	} catch (error) {
		return Response.json({ message: error }, { status: 500 });
	}
}
