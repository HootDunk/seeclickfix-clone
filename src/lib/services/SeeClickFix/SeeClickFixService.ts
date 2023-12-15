import { z } from 'zod';
import requestTypes from './mock-data/request-types.json';
import requestType from './mock-data/request-type.json';
import issues from './mock-data/issues.json';
import issue from './mock-data/issue.json';
import issueWithDetails from './mock-data/issue-with-details.json';
// import type { Point } from 'geojson';

// select a single value from list.  I imagine they have some sort of multi-select/checkboxes type as well
export const SelectQuestionTypeSchema = z.literal('select');
export const TextareaQuestionTypeSchema = z.literal('textarea');
export const TextQuestionTypeSchema = z.literal('text');
export const FileQuestionTypeSchema = z.literal('file');
export const QuestionTypeSchema = z.union([
	SelectQuestionTypeSchema,
	TextareaQuestionTypeSchema,
	TextQuestionTypeSchema,
	FileQuestionTypeSchema
]);

export const QuestionSchema = z.object({
	primary_key: z.string(),
	question: z.string(),
	question_type: QuestionTypeSchema,
	answer_kept_private: z.boolean(),
	max_length: z.number().nullish(), // ideally this should only exist on a subset of question types.  will likely refactor out once we know more about question types
	response_required: z.boolean()
});

export const SelectOptionSchema = z.object({
	key: z.string(),
	name: z.string()
});

export const SelectQuestionSchema = QuestionSchema.extend({
	question_type: SelectQuestionTypeSchema,
	select_values: SelectOptionSchema
});

export const RequestTypeSchema = z.object({
	id: z.number(),
	title: z.string(),
	location_required: z.boolean(),
	block_submission: z.boolean(),
	permit_guest_reporting: z.boolean(),
	is_other: z.boolean(),
	permit_anonymous_reporting: z.boolean(),
	private_visibility: z.boolean(),
	organization: z.string(),
	url: z.string(),
	potential_duplicate_issues_url: z.string()
});
export type RequestType = z.infer<typeof RequestTypeSchema>;

export const RequestTypesResponseSchema = z.object({
	request_types: z.array(RequestTypeSchema)
});

export type RequestTypesResponse = z.infer<typeof RequestTypesResponseSchema>;

type HasId<T> = {
	id: T;
};

export const RequestTypeResponseSchema = RequestTypeSchema.extend({
	questions: z.array(QuestionSchema) // todo union of all question types
});

export type RequestTypeResponse = z.infer<typeof RequestTypeResponseSchema>;

export const OpenIssueStatusSchema = z.literal('Open');
export const ClosedIssueStatusSchema = z.literal('Closed');
export const AcknowledgedIssueStatusSchema = z.literal('Acknowledged');
export const ArchivedIssueStatusSchema = z.literal('Archived');
export const IssueStatusSchema = z.union([
	OpenIssueStatusSchema,
	ClosedIssueStatusSchema,
	AcknowledgedIssueStatusSchema,
	ArchivedIssueStatusSchema
]);
export type IssueStatus = z.infer<typeof IssueStatusSchema>;

export const MediaSchema = z.object({
	video_url: z.string().nullish(),
	image_full: z.string().nullish(),
	image_square_100x100: z.string().nullish(),
	representative_image_url: z.string().nullish()
});

export const HasMediaSchema = z.object({
	media: MediaSchema
});

const PointLiteralSchema = z.literal('Point');
const PointSchema = z.object({
	type: PointLiteralSchema,
	coordinates: z.tuple([z.number(), z.number()])
});
export type Point = z.infer<typeof PointSchema>;

const AvatarSchema = z.object({
	full: z.string(),
	square_100x100: z.string()
});

const ProfileSchema = z.object({
	id: z.number(),
	name: z.string(),
	role: z.string(), // todo likely an enum/string union list them as you find them here: "Verified Official"
	avatar: AvatarSchema,
	html_url: z.string(),
	witty_title: z.string(),
	civic_points: z.number()
});

const IssueSchema = z.object({
	id: z.number(),
	status: IssueStatusSchema,
	summary: z.string(),
	description: z.string(),
	rating: z.number(),
	lat: z.number(),
	lng: z.number(),
	address: z.string(),
	created_at: z.string(),
	acknowledged_at: z.string(), // todo fix
	closed_at: z.string().nullish(), // todo fix
	reopened_at: z.string().nullish(),
	updated_at: z.string(),
	shortened_url: z.string().nullish(),
	url: z.string(),
	point: PointSchema,
	private_visibility: z.boolean(),
	html_url: z.string(),
	request_type: RequestTypeSchema.pick({
		id: true,
		title: true,
		organization: true,
		url: true
	}),
	comment_url: z.string(),
	flag_url: z.string(),
	transitions: z.object({}),
	reporter: ProfileSchema,
	media: MediaSchema
});

export type Issue = z.infer<typeof IssueSchema>;

const CurrentUserRelationshipSchema = z.object({
	following: z.boolean(),
	voted: z.boolean(),
	reporter: z.boolean(),
	assignee: z.boolean()
});

const ActionSchema = z.object({
	vote_url: z.string(),
	follow_url: z.string()
});

const QuestionAnswerSchema = z.object({
	question: z.string(), // this is the question id (primary_key)
	answer: z.string()
});

const IntegrationSchema = z.object({
	remote_id: z.string(),
	status: z.string(),
	title: z.string()
});

const CommentSchema = z.object({
	comment: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
	editable_until: z.string(),
	last_edited_at: z.string().nullish(),
	commenter: ProfileSchema,
	issue_url: z.string(),
	flag_url: z.string(),
	media: MediaSchema.omit({ representative_image_url: true })
});

export const IssueWithDetailsSchema = IssueSchema.extend({
	actions: ActionSchema,
	point: PointSchema,
	request_type: RequestTypeSchema.pick({
		id: true,
		title: true,
		organization: true,
		url: true
	}),
	integrations: z.array(IntegrationSchema),
	assignee: ProfileSchema.nullish(), // again should be dependent on the status of the issue
	questions: z.array(QuestionAnswerSchema),
	comments: z.array(CommentSchema),
	current_user_relationship: CurrentUserRelationshipSchema
});

export type IssueWithDetails = z.infer<typeof IssueWithDetailsSchema>;

// will probably need to change area to match some geojson type. waiting until I work more with map to see if it becomes more obvious
// https://datatracker.ietf.org/doc/html/rfc7946#section-5
type GetIssuesParams = {
	area: {
		min_lat: number;
		min_lng: number;
		max_lat: number;
		max_lng: number;
	};
	statuses: IssueStatus[];
	page: number;
};

export const PaginationSchema = z.object({
	entries: z.number(),
	page: z.number(),
	per_page: z.number(),
	pages: z.number(),
	next_page: z.number().nullish(),
	next_page_url: z.string().nullish(),
	previous_page: z.number().nullish(),
	previous_page_url: z.string().nullish()
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const HasPaginationSchema = z.object({
	pagination: PaginationSchema
});

export const IssuesResponseSchema = z.object({
	issues: z.array(
		IssueSchema.pick({
			id: true,
			status: true,
			summary: true,
			description: true,
			lat: true,
			lng: true,
			address: true,
			created_at: true,
			acknowledged_at: true,
			closed_at: true,
			url: true,
			media: true
		})
	),
	metadata: HasPaginationSchema
});
export type IssuesResponse = z.infer<typeof IssuesResponseSchema>;

// https://codewithstyle.info/typescript-async-result/#:~:text=AsyncResult%20is%20a%20simple%20type,fetch%20call%20in%20our%20case).
export type AsyncResult<TResult, TError = unknown> =
	| AsyncInProgress
	| AsyncSuccess<TResult>
	| AsyncFailure<TError>;

type AsyncInProgress = {
	type: 'inProgress';
};

type AsyncSuccess<TResult> = {
	type: 'success';
	value: TResult;
};

type AsyncFailure<TError> = {
	type: 'failure';
	error: TError;
};

export const asAsyncSuccess = <TResult>(value: TResult): AsyncSuccess<TResult> => ({
	type: 'success',
	value
});

export const asAsyncFailure = <TError>(error: TError): AsyncFailure<TError> => ({
	type: 'failure',
	error
});

export const ASYNC_IN_PROGRESS: AsyncInProgress = { type: 'inProgress' };

// on the fence with whether it is better to use the AsyncResult type here or convert within svelte components
// leaning towards doing the conversion in the components bc it really only exists for display purposes.
export interface SeeClickFixService {
	getRequestTypes(params: { lat: number; lng: number }): Promise<RequestTypesResponse>;
	getRequestType(params: HasId<number>): Promise<RequestTypeResponse>;
	// todo IRL implement a cache and stringify the params as the key, have cache expire quickly (2mins)
	getIssues(params: GetIssuesParams): Promise<IssuesResponse>;
	getIssue(params: HasId<number>): Promise<Issue>;
	getIssueWithDetails(params: HasId<number>): Promise<IssueWithDetails>;
}

export class MockSeeClickFixService implements SeeClickFixService {
	async wait(seconds: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('Promise resolved after 1 second');
			}, seconds * 1000); // 1000 milliseconds = 1 second
		});
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getRequestTypes(params: { lat: number; lng: number }): Promise<RequestTypesResponse> {
		return RequestTypesResponseSchema.parse(requestTypes);
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getRequestType(hasId: HasId<number>): Promise<RequestTypeResponse> {
		return RequestTypeResponseSchema.parse(requestType);
	}
	async getIssues(params: GetIssuesParams): Promise<IssuesResponse> {
		// todo IRL implement a cache and stringify the params as the key, have cache expire quickly (2mins)
		await this.wait(1);
		const issuesRes = IssuesResponseSchema.parse(issues);
		issuesRes.metadata.pagination.page = params.page;
		issuesRes.metadata.pagination.next_page = params.page + 1;
		issuesRes.metadata.pagination.previous_page = params.page == 1 ? undefined : params.page - 1;

		return issuesRes;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getIssue(params: HasId<number>): Promise<Issue> {
		return IssueSchema.parse(issue);
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getIssueWithDetails(params: HasId<number>): Promise<IssueWithDetails> {
		return IssueWithDetailsSchema.parse(issueWithDetails);
	}
}
