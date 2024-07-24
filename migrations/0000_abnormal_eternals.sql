-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `trades` (
	`id` integer PRIMARY KEY NOT NULL,
	`timestamp` integer,
	`side` text,
	`size` integer NOT NULL,
	`price` integer,
	`symbol` text,
	`gross_value` integer,
	`tick_direction` text NOT NULL
);

*/