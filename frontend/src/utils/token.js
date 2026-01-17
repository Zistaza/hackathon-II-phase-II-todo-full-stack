/**
 * Utility functions for handling JWT tokens in the frontend
 */


/**
 * Parse a JWT token to extract its payload
 * @param {string} token - The JWT token to parse
 * @returns {Object|null} The decoded payload or null if invalid
 */
export function parseJWT(token) {
  try {
    // Split the token into its three parts
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid token format');
    }

    // Convert base64url to base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Decode the base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}


/**
 * Check if a JWT token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if the token is expired, false otherwise
 */
export function isTokenExpired(token) {
  if (!token) {
    return true;
  }

  const payload = parseJWT(token);
  if (!payload) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}


/**
 * Check if a JWT token is about to expire (within a specified time window)
 * @param {string} token - The JWT token to check
 * @param {number} minutes - The time window in minutes (default: 5)
 * @returns {boolean} True if the token is expiring soon, false otherwise
 */
export function isTokenExpiringSoon(token, minutes = 5) {
  if (!token) {
    return true;
  }

  const payload = parseJWT(token);
  if (!payload) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const expiringSoonThreshold = minutes * 60; // Convert minutes to seconds
  return payload.exp - currentTime < expiringSoonThreshold;
}


/**
 * Get the remaining time until token expiration in seconds
 * @param {string} token - The JWT token to check
 * @returns {number} The number of seconds until expiration, or 0 if expired/near expiration
 */
export function getTokenRemainingTime(token) {
  if (!token) {
    return 0;
  }

  const payload = parseJWT(token);
  if (!payload) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const remaining = payload.exp - currentTime;

  return Math.max(0, remaining);
}


/**
 * Get the user ID from a JWT token
 * @param {string} token - The JWT token to extract user ID from
 * @returns {string|null} The user ID or null if not found
 */
export function getUserIdFromToken(token) {
  if (!token) {
    return null;
  }

  const payload = parseJWT(token);
  if (!payload) {
    return null;
  }

  // The user ID might be in 'sub' (subject) or 'user_id' claim
  return payload.sub || payload.user_id || null;
}


/**
 * Get the email from a JWT token
 * @param {string} token - The JWT token to extract email from
 * @returns {string|null} The email or null if not found
 */
export function getEmailFromToken(token) {
  if (!token) {
    return null;
  }

  const payload = parseJWT(token);
  if (!payload) {
    return null;
  }

  // The email might be in 'email' or 'user_email' claim
  return payload.email || payload.user_email || null;
}


/**
 * Validate the structure and basic properties of a JWT token
 * @param {string} token - The JWT token to validate
 * @returns {Object} Validation result with boolean flags
 */
export function validateToken(token) {
  if (!token || typeof token !== 'string') {
    return {
      isValid: false,
      hasValidFormat: false,
      isExpired: true,
      hasRequiredClaims: false,
      error: 'Token is not provided or not a string'
    };
  }

  // Check if it has the correct JWT format (3 parts separated by dots)
  const parts = token.split('.');
  const hasValidFormat = parts.length === 3 && parts.every(part => part.length > 0);

  if (!hasValidFormat) {
    return {
      isValid: false,
      hasValidFormat: false,
      isExpired: true,
      hasRequiredClaims: false,
      error: 'Token does not have a valid JWT format'
    };
  }

  // Parse the token to check for expiration and required claims
  const payload = parseJWT(token);

  if (!payload) {
    return {
      isValid: false,
      hasValidFormat: true,
      isExpired: true,
      hasRequiredClaims: false,
      error: 'Failed to parse token payload'
    };
  }

  // Check if token is expired
  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = payload.exp < currentTime;

  // Check for required claims (user_id and email are required based on our auth system)
  const hasRequiredClaims = !!(payload.sub || payload.user_id) && !!payload.email;

  const isValid = hasValidFormat && !isExpired && hasRequiredClaims;

  return {
    isValid,
    hasValidFormat,
    isExpired,
    hasRequiredClaims,
    error: isValid ? null : (isExpired ? 'Token is expired' : hasRequiredClaims ? 'Token has invalid format' : 'Token missing required claims')
  };
}


/**
 * Get token information including expiration and user details
 * @param {string} token - The JWT token to inspect
 * @returns {Object|null} Token information or null if invalid
 */
export function getTokenInfo(token) {
  if (!token) {
    return null;
  }

  const payload = parseJWT(token);
  if (!payload) {
    return null;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = payload.exp < currentTime;
  const timeUntilExpiry = Math.max(0, payload.exp - currentTime);

  return {
    userId: payload.sub || payload.user_id || null,
    email: payload.email || payload.user_email || null,
    isExpired,
    timeUntilExpiry,
    expiresAt: new Date(payload.exp * 1000),
    issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
    issuer: payload.iss || null,
    audience: payload.aud || null,
    subject: payload.sub || null
  };
}