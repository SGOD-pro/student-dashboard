import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PresentByBatch {
	batchId: string;
	presents: number;
	_id: string;
	subject: string;
  timing:string;
}

interface Student {
	_id: string;
	name: string;
	admissionNo: string;
	subjects: string;
	picture: string;
	presentByBatch: PresentByBatch[];
	phoneNo: string[];
	batches: string[];
	fees: number;
	admissionDate: string;
}

interface Assignment {
	_id: string;
	submissionDate: string;
	createdAt: string;
	subject: string;
}
interface Fees {
	_id: string;
	paidMonth: string;
	createdAt: string;
}

interface Exam {
	_id: string;
	title: string;
	caption: string;
	subject: string;
	date: string;
	__v: number;
}

interface Attendance {
	_id: string;
	createdAt: Date[];
}
interface StudentState {
	student: Student | null;
	assignments: Assignment[];
	fees: Fees | null;
	exam: Exam[];
	attendance: Attendance | null;
}

const initialState: StudentState = {
	student: null,
	assignments: [],
	fees: null,
	exam: [],
	attendance: null,
};

const DetailsSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		setStudent(state, action: PayloadAction<Student>) {
			state.student = action.payload;
		},

		setFees(state, action: PayloadAction<Fees>) {
			state.fees = action.payload;
		},
		setAssignments(state, action: PayloadAction<Assignment[]>) {
			const assignmentsSet = new Set(state.assignments.map((a) => a._id));
			action.payload.forEach((assignment) => {
				if (!assignmentsSet.has(assignment._id)) {
					state.assignments.push(assignment);
				}
			});
		},
		setExam(state, action: PayloadAction<Exam[]>) {
			const examsSet = new Set(state.exam.map((e) => e._id));
			action.payload.forEach((exam) => {
				if (!examsSet.has(exam._id)) {
					state.exam.push(exam);
				}
			});
		},
		setAttendance(state, action: PayloadAction<Attendance>) {
			state.attendance = action.payload;
		},
		// Additional reducers can be added here if needed
	},
});

export const { setStudent, setAssignments, setFees, setExam, setAttendance } =
	DetailsSlice.actions;

export default DetailsSlice.reducer;
