CREATE TABLE `category` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`icon` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);