/**
 * Custom hook for haptic feedback (vibration) support
 * Works on mobile devices that support the Vibration API
 */

export type HapticType = "light" | "medium" | "heavy" | "success" | "warning" | "error" | "selection";

export function useHaptic() {
  const triggerHaptic = (type: HapticType = "light") => {
    // Check if vibration is supported
    if (typeof window === "undefined" || !("vibrate" in navigator)) {
      return;
    }

    // Vibration patterns (in milliseconds)
    const patterns: Record<HapticType, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 50, 10],
      warning: [20, 100, 20],
      error: [30, 100, 30, 100, 30],
      selection: 5,
    };

    const pattern = patterns[type];
    navigator.vibrate(pattern);
  };

  return { triggerHaptic };
}
