/**
 * Generates initials from a user's name
 * @param name - The full name of the user
 * @returns The initials (up to 2 characters)
 */
export function getInitials(name: string | null | undefined): string {
  if (!name || name.trim() === '') {
    return 'U'; // Default fallback for "User"
  }

  const words = name.trim().split(/\s+/);
  
  if (words.length === 1) {
    // Single word - take first 2 characters
    return words[0].substring(0, 2).toUpperCase();
  }
  
  // Multiple words - take first character of first two words
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

/**
 * Gets the full profile image URL
 * @param profileImage - The profile image path from the API
 * @returns The full URL or null if no image
 */
export function getProfileImageUrl(profileImage: string | null): string | null {
  if (!profileImage) return null;
  
  // If it's already a full URL, return as is
  if (profileImage.startsWith('http://') || profileImage.startsWith('https://')) {
    return profileImage;
  }
  
  // If it's a relative path, construct the full URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  return `${apiUrl}${profileImage}`;
}