import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Example Table: Users (synced with Supabase Auth via triggers perfectly, or managed manually)
// For now, let's just create a 'profiles' table that Supabase recommends for user metadata
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(), // Should match auth.users.id
  email: text("email").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Example Table: Projects
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: uuid("owner_id").notNull(), // References profiles.id
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
