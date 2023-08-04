declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>[];
  }
}

export type EventType = "Metacrew_Homepage_Enter" | "Metacrew_search";

const shouldTrackEvent = () => {
  return process.env.NEXT_PUBLIC_ENABLE_TRACKING_EVENT === "true";
};

export const trackEvent = (
  eventType: EventType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventParameters: Record<string, any> = {}
) => {
  try {
    console.log(
      window.dataLayer && shouldTrackEvent() ? "[Tracked]" : "[Not Tracked]",
      eventType,
      eventParameters
    );

    if (window.dataLayer && shouldTrackEvent()) {
      window.dataLayer.push({
        event: "custom_event", // Event name that will activate trigger
        eventType, // event type which would be sent to GA.
        ...eventParameters,
      });
    }
  } catch (error) {
    console.log("TRACKING ERROR: ", error);
  }
};
