// Simple test to verify avatar functionality
import { getInitials, getProfileImageUrl } from "@/lib/avatar-utils"

// Test cases for getInitials function
console.log("Testing getInitials function:")
console.log("John Doe ->", getInitials("John Doe")) // Should return "JD"
console.log("Alice ->", getInitials("Alice")) // Should return "AL"
console.log("null ->", getInitials(null)) // Should return "U"
console.log("empty string ->", getInitials("")) // Should return "U"
console.log("John Michael Smith ->", getInitials("John Michael Smith")) // Should return "JM"

// Test cases for getProfileImageUrl function
console.log("\nTesting getProfileImageUrl function:")
console.log("null ->", getProfileImageUrl(null)) // Should return null
console.log("relative path ->", getProfileImageUrl("/uploads/profile-123.png")) // Should return full URL
console.log("full URL ->", getProfileImageUrl("https://example.com/image.jpg")) // Should return as is