"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GameMessage } from "@/components/providers/game-runtime";

const isoDateRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;

type PersonId = string;
export type AllMessagesStore = Map<PersonId, GameMessage[]>;

export interface MessagesState {
  allMessages: AllMessagesStore;
  getMessages: (personId: PersonId) => GameMessage[];
  addMessage: (personId: PersonId, message: GameMessage) => void;
}

export const useMessagesStore = create<MessagesState>()(
  persist(
    (set, get) => ({
      allMessages: new Map<PersonId, GameMessage[]>(),

      getMessages: (personId: PersonId) => {
        return get().allMessages.get(personId) || [];
      },

      addMessage: (personId: PersonId, message: GameMessage) => {
        set((state) => {
          const newStore = new Map(state.allMessages);
          const currentMessages = newStore.get(personId) || [];
          const existingIndex = currentMessages.findIndex(
            (m) => m.id === message.id
          );

          let updatedMessages;
          if (existingIndex >= 0) {
            updatedMessages = [...currentMessages];
            updatedMessages[existingIndex] = message;
          } else {
            updatedMessages = [...currentMessages, message];
          }

          newStore.set(personId, updatedMessages);
          return { allMessages: newStore };
        });
      },
    }),
    {
      name: "detective-game-messages-storage",
      storage: createJSONStorage(() => localStorage, {
        replacer: (key, value) => {
          if (value instanceof Map) {
            return {
              _type: "map",
              value: Array.from(value.entries()),
            };
          }
          return value;
        },
        reviver: (key, value) => {
          if (
            typeof value === "object" &&
            value !== null &&
            (value as { _type: string })._type === "map"
          ) {
            return new Map(
              (value as { value: Array<[PersonId, GameMessage[]]> }).value
            );
          }
          if (typeof value === "string" && isoDateRegex.test(value)) {
            const potentialDate = new Date(value);
            if (!isNaN(potentialDate.getTime())) {
              return potentialDate;
            }
          }
          return value;
        },
      }),
    }
  )
);

if (typeof window !== "undefined") {
  useMessagesStore.persist.rehydrate();
}
