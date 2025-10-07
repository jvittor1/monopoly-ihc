import type { Tile } from "@/hooks/use-board";

type EventMap = {
  showModal: { tile: Tile; playerId: number };
  closeModal: void;
  nextTurn: void;
};

class EventBus<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: ((payload: T[K]) => void)[] } = {};

  on<K extends keyof T>(event: K, callback: (payload: T[K]) => void) {
    this.listeners[event] = this.listeners[event] ?? [];
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof T>(event: K, callback: (payload: T[K]) => void) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter(
      (fn) => fn !== callback,
    );
  }

  emit<K extends keyof T>(
    event: K,
    ...payload: T[K] extends void ? [] : [T[K]]
  ) {
    const value = (payload as [T[K]] | [])[0] as T[K];
    this.listeners[event]?.forEach((fn) => fn(value));
  }
}

export const eventBus = new EventBus<EventMap>();
