import { useCallback } from 'react';

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export interface TrackingData {
  buttonType?: string;
  buttonText?: string;
  [key: string]: any;
}

export const useUmamiTracking = () => {
  const trackEvent = useCallback((eventName: string, eventData?: TrackingData) => {
    if (window.umami) {
      try {
        window.umami.track(eventName, { ...eventData, location: window.location.pathname });
      } catch (error) {
        console.warn('Umami tracking failed:', error);
      }
    }
  }, []);

  return { trackEvent };
};