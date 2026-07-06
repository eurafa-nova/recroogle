import { describe, it, expect } from "vitest";
import { search, PROFILE } from "./search.js";

describe("search()", () => {
  it("should always return a single result regardless of query", () => {
    const queries = [
      "",
      "developer",
      "anything at all",
      "!!@#$%^&*()",
      "a very long query that nobody would ever type in real life seriously why would someone search this",
      " ",
      "null",
      "undefined",
      "42",
    ];

    for (const query of queries) {
      const result = search(query);
      expect(result.count).toBe(1);
      expect(result.profile).toBeDefined();
    }
  });

  it("should return the same profile for different queries", () => {
    const r1 = search("react developer");
    const r2 = search("python backend");
    const r3 = search("");

    expect(r1.profile.name).toBe(PROFILE.name);
    expect(r1.profile.skills).toEqual(PROFILE.skills);
    expect(r1.profile.email).toBe(PROFILE.email);

    expect(r2.profile.name).toBe(PROFILE.name);
    expect(r3.profile.name).toBe(PROFILE.name);
  });

  it("should return a copy of the profile, not the reference", () => {
    const result = search("test");
    expect(result.profile).not.toBe(PROFILE);
  });

  it("should return the profile with all expected fields", () => {
    const result = search("anything");
    const profile = result.profile;

    expect(profile).toHaveProperty("name");
    expect(profile).toHaveProperty("initials");
    expect(profile).toHaveProperty("title");
    expect(profile).toHaveProperty("bio");
    expect(profile).toHaveProperty("skills");
    expect(profile).toHaveProperty("location");
    expect(profile).toHaveProperty("email");
    expect(profile).toHaveProperty("website");
    expect(profile).toHaveProperty("github");
    expect(profile).toHaveProperty("linkedin");
  });

  it("should have a non-empty name", () => {
    expect(PROFILE.name.length).toBeGreaterThan(0);
  });

  it("should have at least one skill", () => {
    expect(PROFILE.skills.length).toBeGreaterThan(0);
  });
});
