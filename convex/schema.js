import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()), // Profile Picture K liye

    plan: v.union(v.literal("free"), v.literal("pro")),

    // Usage tracking for plan limits
    projectsUsed: v.number(), // Current project Count

    exportsThisMonth: v.number(), //Monthly export limit tracking

    // Optional Hai
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" }) // For User Search
    .searchIndex("search_email", { searchField: "email" }),

  project: defineTable({
    //Basic Project Info
    title: v.string(),
    userId: v.id("users"),

    // Canvas Dimension and state
    canvasState: v.any(), // Fabric.js canvas JSON (Objects, layer etc.)
    width: v.number(), //Canvas width in pixels
    height: v.number(), // Canvas Height in Pixels

    // Image pipline - tracks image transformations
    originalImageUrl: v.optional(v.string()), //Initial uploaded image
    currentImageUrl: v.optional(v.string()), // Current processed image
    thumbnailUrl: v.optional(v.string()), // Small preeview for dashboard

    // ImageKit transformation state
    activeTransformations: v.optional(v.string()), //Current ImageKit URL params

    // AI features state - tracks what AI processing has been applied
    backgroundRemoved: v.optional(v.boolean()), //Has background been removed

    // Organization
    folderId: v.optional(v.id("folders")), //HW- Optional folder organization

    //  Timestamps
    createdAt: v.number(),
    updatedAt: v.number(), //Last edit time
  })
    .index("by_user", ["userId"])
    .index("by_user_updated", ["userId", "updatedAt"])
    .index("by_folder", ["folderId"]), // Project in folder

  folders: defineTable({
    name: v.string(), //Folder name
    userId: v.id("users"), //Owner
    createdAt: v.number(),
  }).index("by_user", ["userId"]), // User's folders
});

/*
PLAN LIMITS EXAMPLE:
-Free : 3 projects, 20 exports/month, basic features only

- Pro : Unlimited project/exports, all AI features

*/
