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
  }),
});
