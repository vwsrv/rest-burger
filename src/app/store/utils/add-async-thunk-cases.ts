import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  SerializedError,
} from '@reduxjs/toolkit';

type TRejectedAction = {
  error: SerializedError;
  payload?: unknown;
};

type TAsyncThunkOptions<State extends object, Payload> = {
  loadingKey?: 'loading' | 'saving';
  rejectMessage?: string;
  setPayload?: (state: Draft<State>, payload: Payload) => void;
  onPending?: (state: Draft<State>) => void;
  onFulfilled?: (state: Draft<State>, payload: Payload) => void;
  onRejected?: (state: Draft<State>, action: TRejectedAction) => void;
};

/**
 * Добавляет к builder стандартные addCase для pending/fulfilled/rejected async thunk.
 * По умолчанию: pending — loading true, error null; fulfilled — loading false, setPayload, error null;
 * rejected — loading false, error = action.error.message || rejectMessage.
 * Можно переопределить через onPending, onFulfilled, onRejected.
 */
export function addAsyncThunkCases<State extends object, Payload, Arg>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Payload, Arg, { state?: unknown }>,
  options: TAsyncThunkOptions<State, Payload>
): void {
  const key = options.loadingKey ?? 'loading';
  const message = options.rejectMessage ?? 'Something went wrong';

  builder
    .addCase(thunk.pending, (state) => {
      (state as Record<string, unknown>)[key] = true;
      if ('error' in state && state.error !== undefined) {
        (state as { error: string | null }).error = null;
      }
      options.onPending?.(state);
    })
    .addCase(thunk.fulfilled, (state, action) => {
      (state as Record<string, unknown>)[key] = false;
      if ('error' in state && state.error !== undefined) {
        (state as { error: string | null }).error = null;
      }
      options.setPayload?.(state, action.payload);
      options.onFulfilled?.(state, action.payload);
    })
    .addCase(thunk.rejected, (state, action) => {
      (state as Record<string, unknown>)[key] = false;
      if (options.onRejected) {
        options.onRejected(state, {
          error: action.error,
          payload: action.payload,
        });
      } else if ('error' in state && state.error !== undefined) {
        (state as { error: string | null }).error = action.error.message || message;
      }
    });
}
