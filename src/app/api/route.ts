import { connectToDatabase } from "@/lib/mongo";
import {
	StudentModel,
	FeesModel,
	AttendanceModel,
	AssignmentModel,
	ExamModel,
} from "../connections";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function getFees(id: string) {
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
					createdAt: {
						$dateToString: {
							date: "$createdAt",
							format: "%d-%m-%Y",
						},
					},
					paidMonth: {
						$dateToString: {
							date: "$paidMonth",
							format: "%d-%m-%Y",
						},
					},
				},
			},
			{
				$project: {
					createdAt: 1,
					paidMonth: 1,
				},
			},
		])
		.toArray();

	return Array.isArray(document) && document.length > 0 ? document[0] : null;
}
async function getAttendence(id: string) {
	return await AttendanceModel()
		.aggregate([
			{
				$unwind: {
					path: "$studentsId",
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$match: {
					studentsId: id,
				},
			},
			{
				$group: {
					_id: "$studentsId",
					createdAt: {
						$push: "$createdAt",
					},
				},
			},
		])
		.toArray();
}
async function getAssignments(batches: string[] | undefined) {
	if (!batches || batches.length === 0) {
		return;
	}
	const batchIds = batches.map((item) => new mongoose.Types.ObjectId(item));
	return await AssignmentModel()
		.aggregate([
			{
				$match: {
					batch: {
						$in: batchIds,
					},
				},
			},
			{
				$lookup: {
					from: "batches",
					localField: "batch",
					foreignField: "_id",
					as: "subject",
					pipeline: [
						{
							$project: {
								subject: 1,
							},
						},
					],
				},
			},
			{
				$addFields: {
					submissionDate: {
						$dateToString: {
							date: "$submissionDate",
							format: "%d-%m-%Y",
						},
					},
					subject: {
						$arrayElemAt: ["$subject", 0],
					},
				},
			},
			{
				$project: {
					submissionDate: 1,
					createdAt: 1,
					subject: "$subject.subject",
				},
			},
		])
		.toArray();
}
async function getExams(batches: string[] | undefined) {
	if (!batches || batches.length === 0) {
		return;
	}
	const batchIds = batches.map((item) => new mongoose.Types.ObjectId(item));

	const documents = await ExamModel()
		.aggregate([
			{
				$match: {
					batch: {
						$in: batchIds,
					},
				},
			},
			{
				$lookup: {
					from: "batches",
					localField: "batch",
					foreignField: "_id",
					as: "subject",
					pipeline: [
						{
							$project: {
								subject: 1,
							},
						},
					],
				},
			},
			{
				$addFields: {
					date: {
						$dateToString: {
							date: "$date",
							format: "%d-%m-%Y",
						},
					},
					subject: {
						$arrayElemAt: ["$subject", 0],
					},
				},
			},
			{
				$project: {
					date: 1,
					title: 1,
					caption: 1,
					subject: "$subject.subject",
				},
			},
		])
		.toArray();

	return documents;
}
export async function POST(req: Request) {
	await connectToDatabase();
	try {
		const adno = await req.json();
		if (!adno || !adno.input) {
			return Response.json(
				{ message: "Cannot get admission no" },
				{ status: 401 }
			);
		}
		const student = await StudentModel().findOne({ admissionNo: adno.input });
		if (!student) {
			return Response.json({ message: "Student not found" }, { status: 404 });
		}
		const response = NextResponse.json(
			{ message: "Fetched..." },
			{ status: 200 }
		);

		response.cookies.set("id", student._id.toString(), {
			httpOnly: true,
		});

		return response;
	} catch (error) {
		console.log(error);
		return Response.json({ message: error }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	await connectToDatabase();
	try {
		const id = req.cookies.get("id")?.value;

		if (!id) {
			return Response.json({ message: "User notlogin" }, { status: 409 });
		}
		const student = await StudentModel()
			.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(id),
					},
				},
				{
					$addFields: {
						subjects: {
							$reduce: {
								input: "$subjects",
								initialValue: "",
								in: {
									$concat: [
										"$$value",
										{
											$cond: [
												{
													$eq: ["$$value", ""],
												},
												"",
												", ",
											],
										},
										"$$this",
									],
								},
							},
						},
					},
				},
				{
					$addFields: {
						admissionDate: {
							$dateToString: {
								format: "%d-%m-%Y",
								date: "$admissionDate",
							},
						},
					},
				},

				{
					$unwind: {
						path: "$presentByBatch",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "batches",
						localField: "presentByBatch.batchId",
						foreignField: "_id",
						as: "presentByBatch.subject",
						pipeline: [
							{
								$addFields: {
									days: {
										$reduce: {
											input: "$days",
											initialValue: "",
											in: {
												$concat: [
													"$$value",
													{
														$cond: [
															{
																$eq: ["$$value", ""],
															},
															"",
															", ",
														],
													},
													"$$this",
												],
											},
										},
									},
								},
							},
							{
								$project: {
									subject: 1,
									timing: {
										$concat: ["$days", "(", "$startTime", "-", "$endTime", ")"],
									},
								},
							},
						],
					},
				},
				{
					$addFields: {
						"presentByBatch.subject": {
							$arrayElemAt: ["$presentByBatch.subject", 0],
						},
					},
				},
				{
					$addFields: {
						"presentByBatch.subject": "$presentByBatch.subject.subject",
						"presentByBatch.timing": "$presentByBatch.subject.timing",
					},
				},
				{
					$group: {
						_id: "$_id",
						name: {
							$first: "$name",
						},
						admissionNo: {
							$first: "$admissionNo",
						},
						subjects: {
							$first: "$subjects",
						},
						picture: {
							$first: "$picture",
						},
						fees: {
							$first: "$fees",
						},
						presentByBatch: {
							$push: "$presentByBatch",
						},
						phoneNo: {
							$first: "$phoneNo",
						},
						batches: {
							$first: "$batches",
						},
						admissionDate: {
							$first: "$admissionDate",
						},
					},
				},
			])
			.toArray();
		if (student.length === 0) {
			return Response.json({ message: "Student not found" }, { status: 404 });
		}
		const [fees, exam, assignments, attendence] = await Promise.all([
			getFees(student[0]._id),
			getExams(student[0].batches),
			getAssignments(student[0].batches),
			getAttendence(student[0]._id),
		]);
		const data = {
			student: student[0],
			fees: fees ? fees : null,
			exam: exam ? exam : null,
			assignments: assignments ? assignments : null,
			attendence: attendence[0],
		};
		return Response.json({ message: "Fetched", data }, { status: 200 });
	} catch (error) {
		console.log(error);

		return Response.json({ message: error }, { status: 500 });
	}
}
