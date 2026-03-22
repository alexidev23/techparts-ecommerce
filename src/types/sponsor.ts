export type SponsorStatus = "active" | "inactive";
export type AdStatus = "activo" | "inactivo";

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  link: string;
  status: SponsorStatus;
  createdAt: string;
}

export interface Ad {
  id: string;
  title: string;
  position: string;
  clicks: number;
  status: AdStatus;
}
