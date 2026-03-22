import api from "@/lib/axios";
import type { Sponsor } from "@/types/sponsor";

export const sponsorService = {
  async getActive(): Promise<Sponsor[]> {
    const response = await api.get<Sponsor[]>("/sponsors/active");
    return response.data;
  },
};
