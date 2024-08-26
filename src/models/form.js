import mongoose, { Schema } from 'mongoose';

const fontSubmissionSchema = new Schema({
	hasPermission: {
		type: Boolean,
		required: [true, 'Permission is required.'],
	},

	fontName: {
		type: String,
		required: [true, 'Font name is required.'],
		trim: true,
		minLength: [2, 'Font name must be at least 2 characters long'],
		maxLength: [100, 'Font name must be less than 100 characters long'],
	},

	designerName: {
		type: String,
		required: [true, 'Designer name is required.'],
		trim: true,
		minLength: [2, 'Designer name must be at least 2 characters long'],
		maxLength: [100, 'Designer name must be less than 100 characters long'],
	},

	designerWebsite: {
		type: String,
		trim: true,
		match: [/^https?:\/\/[^\s/$.?#].[^\s]*$/, 'Invalid website URL'], // Optional URL validation
	},

	donationLink: {
		type: String,
		trim: true,
		match: [/^https?:\/\/[^\s/$.?#].[^\s]*$/, 'Invalid donation link'], // Optional URL validation
	},

	file: {
		type: String,
		default: null, // Path or metadata about the uploaded file
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

const FontSubmission =
	mongoose.models.FontSubmission ||
	mongoose.model('FontSubmission', fontSubmissionSchema);

export default FontSubmission;
