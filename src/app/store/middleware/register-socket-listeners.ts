import type { UnknownAction } from '@reduxjs/toolkit';

export type TSocketListenersConfig = {
  connectAction: {
    type: string;
    (payload: string): { type: string; payload: string };
  };
  disconnectAction: {
    type: string;
    (): { type: string };
  };
  onOpen: () => UnknownAction;
  onClose: () => UnknownAction;
  onError: (event?: Event) => UnknownAction;
  onMessage: (data: unknown) => UnknownAction;
};

type TStartListening = (options: {
  actionCreator: unknown;
  effect: (
    action: unknown,
    api: { dispatch: (action: UnknownAction) => void }
  ) => void | Promise<void>;
}) => () => void;

export function registerSocketListeners(
  startListening: TStartListening,
  config: TSocketListenersConfig
): void {
  let socket: WebSocket | null = null;

  startListening({
    actionCreator: config.connectAction,
    effect: (action, { dispatch }) => {
      if (socket) {
        socket.close();
        socket = null;
      }
      const url = (action as { payload: string }).payload;
      socket = new WebSocket(url);

      socket.onopen = () => {
        dispatch(config.onOpen());
      };

      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data as string) as unknown;
        dispatch(config.onMessage(data));
      };

      socket.onerror = (event: Event) => {
        dispatch(config.onError(event));
      };

      socket.onclose = (event: CloseEvent) => {
        if (event.target === socket) {
          socket = null;
        }
        dispatch(config.onClose());
      };
    },
  });

  startListening({
    actionCreator: config.disconnectAction,
    effect: () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    },
  });
}
