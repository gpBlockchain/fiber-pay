/**
 * Determine whether an error thrown during invoice/payment tracking is
 * expected and should be silently skipped (e.g. item not yet indexed,
 * transient connectivity blip).  Unexpected errors are re-thrown by callers.
 */
export function isExpectedTrackerError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /not found|does not exist|no such|temporarily unavailable|connection refused|timed out|timeout/i.test(
    message,
  );
}

/**
 * Returns true when the Fiber node reports that the payment session does not
 * exist at all (e.g. the payment was sent with dry_run and was never persisted,
 * or the record has already been cleaned up).  This is a permanent condition —
 * the session will never appear — so callers should mark the payment as Failed
 * rather than continuing to poll indefinitely.
 */
export function isPaymentSessionNotFoundError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /payment session not found/i.test(message);
}
