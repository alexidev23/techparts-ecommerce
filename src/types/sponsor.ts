export type SponsorStatus = "activo" | "inactivo";
export type AdStatus = "activo" | "inactivo";

export interface Sponsor {
  id: string;
  name: string;
  category: string;
  since: string; // fecha desde que es sponsor
  status: SponsorStatus;
}

export interface Ad {
  id: string;
  title: string;
  position: string; // ej: "banner superior", "sidebar", etc.
  clicks: number;
  status: AdStatus;
}
