import { connection } from "mongoose";

export function StudentModel() {
	return connection.collection("students");
}

export function FeesModel() {
	return connection.collection("fees");
}

export function AttendanceModel() {
	return connection.collection("attendences");
}

export function ExamModel() {
	return connection.collection("exams");
}

export function AssignmentModel() {
	return connection.collection("assignments");
}
export function ResultModel() {
	return connection.collection("results");
}
