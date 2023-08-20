export type TrpgSystem = "call-of-cthulhu" | "ktulua" | "murder-mystery" | "roads-to-load"

export type TaleMatter = {
  date: string;
  title: string;
  lead: string;
  system: TrpgSystem;
  hours: string;
  numOfPlayers: string;
}

export type Tale = {
  id: string;
  contentHtml: string;
} & TaleMatter;
