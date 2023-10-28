CREATE TABLE `post` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`likes` integer,
	`userId` integer
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text,
	`phone` integer
);
