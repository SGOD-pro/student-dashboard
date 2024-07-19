import { connectToDatabase } from "@/lib/mongo";
import { FeesModel } from "@/app/connections";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	await connectToDatabase();
	try {
		const id = req.cookies.get("id")?.value;
		if (!id) return Response.json({ message: "Cann't login" }, { status: 409 });
		const document = await FeesModel()
			.aggregate([
				{
					$match: {
						studentId: new mongoose.Types.ObjectId(id),
					},
				},
				{
					$sort: {
						paidMonth: -1,
					},
				},

				{
					$addFields: {
						paidMonth: {
							$dateToString: {
								date: "$paidMonth",
								format: "%d-%m-%Y",
							},
						},
						month: {
							$dateToString: {
								date: "$createdAt",
								format: "%d-%m-%Y",
							},
						},
					},
				},
				{
                $addFields: {
						newTime: {
							$dateAdd: {
								startDate: "$createdAt",
								unit: "minute",
								amount: 330, // 330 minutes = 5 hours and 30 minutes
							},
						},
					},
				},
				{
					$project: {
						paidMonth: 1,
						month: 1,
						time: {
							$dateToString: {
								date: "$newTime",
								format: "%H:%M",
								timezone: "+00:00",
							},
						},
					},
				},
			])
			.toArray();
		return Response.json(
			{ message: "Fetched", data: document },
			{ status: 200 }
		);
	} catch (error: any) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}
