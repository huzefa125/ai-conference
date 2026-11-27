import type { CSSProperties } from "react";

/*
 * Ticket silhouettes cut with CSS masks, so no images are needed. Apply with `style={TICKET_SHAPES.x}`.
 * Masks also clip box-shadow, so put any shadow on a wrapper as a `drop-shadow` filter instead.
 *
 * perforated: a column of round bites down both long edges.
 * notched:    a quarter-circle bite out of each corner, like an admission stub.
 */
export type TicketShape = "perforated" | "notched";

const bite = (at: string) => `radial-gradient(circle 9px at ${at}, #0000 96%, #000)`;
const corner = (at: string) => `radial-gradient(circle 20px at ${at}, #0000 96%, #000)`;

const PERFORATED = `${bite("0 50%")} 0 50% / 51% 26px repeat-y, ${bite("100% 50%")} 100% 50% / 51% 26px repeat-y`;
const NOTCHED = [
  `${corner("0 0")} top left / 51% 51% no-repeat`,
  `${corner("100% 0")} top right / 51% 51% no-repeat`,
  `${corner("0 100%")} bottom left / 51% 51% no-repeat`,
  `${corner("100% 100%")} bottom right / 51% 51% no-repeat`,
].join(", ");

export const TICKET_SHAPES: Record<TicketShape, CSSProperties> = {
  perforated: { mask: PERFORATED, WebkitMask: PERFORATED },
  notched: { mask: NOTCHED, WebkitMask: NOTCHED },
};
