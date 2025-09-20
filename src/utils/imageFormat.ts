/**
 * Image format utility functions for handling different image formats with fallbacks
 */

/**
 * Convert string iconUrl to object with webp/png/jpg variants
 * @param iconUrl - Original icon URL string
 * @returns Object with webp/png/jpg properties
 */
export const convertIconUrl = (iconUrl: string) => {
  return {
    webp: getWebpUrl(iconUrl),
    png: getPngUrl(iconUrl),
    jpg: getJpgUrl(iconUrl),
  }
}

/**
 * Convert image URL to WebP format
 * @param originalUrl - Original image URL
 * @returns URL with .webp extension
 */
export const getWebpUrl = (originalUrl: string): string => {
  return originalUrl.replace(/\.(png|jpg|jpeg)$/i, '.webp')
}

/**
 * Convert image URL to PNG format
 * @param originalUrl - Original image URL
 * @returns URL with .png extension
 */
export const getPngUrl = (originalUrl: string): string => {
  return originalUrl.replace(/\.(jpg|jpeg|webp)$/i, '.png')
}

/**
 * Convert image URL to JPG format
 * @param originalUrl - Original image URL
 * @returns URL with .jpg extension
 */
export const getJpgUrl = (originalUrl: string): string => {
  return originalUrl.replace(/\.(png|jpeg|webp)$/i, '.jpg')
}

/**
 * Get all possible image format URLs for fallback
 * @param originalUrl - Original image URL
 * @returns Object with different format URLs
 */
export const getImageFormats = (originalUrl: string) => {
  return {
    webp: getWebpUrl(originalUrl),
    png: getPngUrl(originalUrl),
    jpg: getJpgUrl(originalUrl),
    original: originalUrl,
  }
}
