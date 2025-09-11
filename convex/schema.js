users: defineTable({
  name: v.string(),
  tokenIdentifier: v.string(),
}).index("by_token", ["tokenIdentifier"]);
users: defineTable({
  name: v.string(),
  tokenIdentifier: v.string(),
}).index("by_token", ["tokenIdentifier"]);
