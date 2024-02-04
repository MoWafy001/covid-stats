const DEFAULT_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours

const MEMO_PREFIX = "memo_";

type MemoObject<T> = {
  value: T;
  maxAge: number;
  timestamp: number;
};

/**
 * A class that provides memoization functionality.
 */
class Memoization {
  /**
   * Memoizes the result of a function based on a given key.
   * @param key - The key used for memoization.
   * @param fn - The function to be memoized.
    const memoObject = {
      value,
      maxAge: options?.maxAge || DEFAULT_MAX_AGE,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(memoObject));
    return value;
   * @param options - Optional configuration options.
   * @returns The memoized value.
   */
  public async memoize<T>(
    key: string,
    fn: () => T | Promise<T>,
    options?: {
      maxAge?: number;
    }
  ): Promise<T> {
    // Check if memo exists and is not expired
    const memo = this.getMemo<T>(key);
    if (memo) return memo;

    // If memo does not exist or is expired, call the function and memoize the result
    const value = await fn();
    this.setMemo(key, value, options?.maxAge);
    return value;
  }

  /**
   * Gets a memoized value based on a given key.
   * @param key - The key used for memoization.
   * @returns The memoized value or null if it does not exist or is expired.
   */
  getMemo<T>(key: string): T | null {
    const memo = localStorage.getItem(MEMO_PREFIX + key);
    if (memo) {
      const { value, maxAge, timestamp } = JSON.parse(memo);
      if (Date.now() - timestamp < maxAge) {
        return value;
      }
    }
    return null;
  }

  /**
   * Sets a memoized value based on a given key.
   * @param key - The key used for memoization.
   * @param value - The value to be memoized.
   * @param maxAge - The maximum age of the memoized value.
   * @returns void
   */
  setMemo<T>(key: string, value: T, maxAge: number = DEFAULT_MAX_AGE) {
    const memoObject: MemoObject<T> = {
      value,
      maxAge,
      timestamp: Date.now(),
    };

    localStorage.setItem(MEMO_PREFIX + key, JSON.stringify(memoObject));
  }
}

export default new Memoization();
