// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { WEB_IN_APP_EVENT } from './constants';

type JSFunctionEvent = WEB_IN_APP_EVENT | string;

class JSFunctionFactory {
  private androidPostMessageHandler(event: JSFunctionEvent) {
    try {
      WebJSInterface.requestAction(event);
    } catch (error) {
      console.warn(
        `AndroidPostMessageHandler with event "${event}" error`,
        error
      );
    }
  }

  private iosPostMessageHandler(event: JSFunctionEvent) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkit.messageHandlers.requestAction.postMessage(event);
    } catch (error) {
      console.warn(`IOSPostMessageHandler with event "${event}" error`, error);
    }
  }

  /**
   * postMessage
   *
   * @constructor
   * @param {WEB_IN_APP_EVENT} name - WEB_IN_APP_EVENT
   * @param {string | object} body - addition event params
   *
   * @example
   * postMessage({
   *  name: WEB_IN_APP_EVENT.OPEN_PAGE,
   *  body: 'deep_link'
   * }))
   *
   */
  public postMessage(
    eventName: WEB_IN_APP_EVENT,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: string | Record<string, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).webkit) {
        if (body) {
          this.iosPostMessageHandler(JSON.stringify({ name: eventName, body }));
        } else {
          this.iosPostMessageHandler(eventName);
        }
        console.log('IOSPostMessageHandler', { name: eventName, body });
        resolve();
      } else if (typeof WebJSInterface !== 'undefined') {
        this.androidPostMessageHandler(
          JSON.stringify({ name: eventName, body })
        );
        console.log('AndroidPostMessageHandler', { name: eventName, body });
        resolve();
      }

      console.log('Not found device type to emit event', {
        name: eventName,
        body,
      });
      reject(
        `Not found device type to emit event "${JSON.stringify({
          name: eventName,
          body,
        })}"`
      );
    });
  }
}

export default new JSFunctionFactory();
